// Packages
const Discord = require('discord.js-selfbot-v13')
const logger = require('node-color-log')
const fs = require('fs')
const request = require('request')

// Internal Resources
const { token } = require('./config.json')
const { msToRelativeTime, Command } = require('./helper.js')
const activities_list = require('./activities.json')

// Logging
if (!fs.existsSync('./logs')) { fs.mkdirSync('./logs') }
logger.setDate(() => new Date().toLocaleTimeString())

// Client
const client = new Discord.Client({ checkUpdate: false })
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  // Setting User Activity XD (Playing a random activity )
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1)
    client.user.setActivity(activities_list[index])
  }, 5000)
})

// A Safe Message (Just in case string is too long)
function message_(to_send, msg) {
  if (to_send.length >= 500) {
    let dn = Date.now()
    //  ^ Low Effort DN Joke
    fs.writeFileSync('./logs/' + dn + '.txt', to_send)
    let formData = {
      file: fs.createReadStream('./logs/' + dn + '.txt')
    }
    request.post(
      { url: 'https://crepe.moe/upload', formData: formData },
      (err, res, body) => {
        if (err) {
          logger.error(err)
        }
        logger.info(body, 'Uploaded to crepe.moe > ', res)
        let body_ = body.replace('.txt', '')
        msg.channel.send(`https://crepe.moe/c/${body_}`)
      }
    )
  } else {
    msg.channel.send(to_send)
  }
}

// A "safe" evaluator which uses rextest.com
function rextest_eval(code, lcw, extra_args) {
  let url = 'https://rextester.com/rundotnet/Run'
  let data = {
    LanguageChoiceWrapper: lcw,
    EditorChoiceWrapper: '1',
    LayoutChoiceWrapper: '1',
    Program: code,
    Input: '',
    Privacy: '',
    PrivacyUsers: '',
    Title: '',
    SavedOutput: '',
    WholeError: '',
    WholeWarning: '',
    StatsToSave: '',
    CodeGuid: '',
    IsInEditMode: 'False',
    IsLive: 'False',
    ...extra_args
  }
  logger.info(`Sending ${lcw} to ${url}`)
  return new Promise((resolve, reject) => {
    request.post(url, { form: data }, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        resolve(body)
      }
    })
  })
}

// Evaluate Command Helpers
function Eval_(id, message, extra_args) {
  let code = message.content.split(' ').slice(1).join(' ')
  logger.info(`Evaluating ${code}`)
  rextest_eval(code, id, extra_args).then(res => {
    let res_json = JSON.parse(res)
    let to_log = ''
    if (res_json.Errors) {
      logger.error(res_json.Errors)
      to_log = res_json.Errors
    }
    if (res_json.Warnings) {
      logger.warn(res_json.Warnings)
      to_log += res_json.Warnings
    }
    logger.info(res_json.Result)
    to_log += res_json.Result
    message_(to_log, message)
  })
}

function Eval(id, usage, extra_args) {
  new Command('', usage, () => Eval_(id, message, extra_args))
}

const Evaluate_Commands = []
Evaluate_Commands.push(
  Eval('14', 'lua'),
  Eval('43', 'kotlin'),
  Eval('17', 'js'),
  Eval('7', 'cpp', { CompilerArgs: "-Wall -std=c++14 -O2 -o a.out source_file.cpp" }),
  Eval('38', 'bash'),
  Eval('15', 'asm'),
  Eval('5', 'py'),
  Eval('24', 'py3'),
  Eval('46', 'rust'),
  Eval('33', 'mysql'),
  Eval('45', 'fortran'),
  Eval('12', 'ruby'),
  Eval('1', 'c#'),
  Eval('30', 'd', { CompilerArgs: "source_file.d -ofa.out" }),
  Eval('9', 'pascal'),
  Eval('23', 'nodejs')
)


// All the packaged commands (that aren't eval commands)
const Commands = []
Commands.push(
  new Command('All the functions and their usage', 'help', message => {
    // Help 
    let help_message = ''
    for (let i = 0; i < Commands.length; i++) {
      help_message += `${Commands[i].description}\nUsage: ${Commands[i].usage}\n\n`
    }
    message_(help_message, message)
  }),

  // Ping
  new Command('?', 'ping', message => {
    message.channel.send(
      `🏓 Pong!\nLatency is ${Date.now() -
      message.createdTimestamp}ms.\nAPI Latency is ${Math.round(
        client.ws.ping
      )}ms`
    )
  }),

  // Uptime
  new Command('How long the bot has been on', 'uptime', message => {
    let uptime = client.uptime
    let uptime_r = `${msToRelativeTime(uptime)} ago`
    message.channel.send(`Uptime: ${uptime_r}`)
  }),
  new Command('Gets the pfp of a user', 'getpfp', message => {
    let user = message.mentions.users.first()
    if (user) {
      if (user.avatarURL != null) {
        message.channel.send(user.avatarURL)
      } else {
        message.channel.send('User has no/default pfp')
      }
    } else {
      message.channel.send(`No user specified`)
    }
  }),

  // Echo
  new Command('Echoes back what you say', 'echo', message => {
    let blocked = ['?echo']
    let args = message.content.split(' ')
    let echo_message = ''
    for (let i = 1; i < args.length; i++) {
      echo_message += `${args[i]} `
    }
    for (let i = 0; i < blocked.length; i++) {
      if (echo_message.includes(blocked[i])) {
        let index = echo_message.indexOf(blocked[i])
        echo_message = `\u200b${echo_message.substring(index)}`
      }
    }
    message_(echo_message, message)
  })
)

// Foreaching the commands
function forEachCommand(commands, message) {
  for (let i = 0; i < commands.length; i++) {
    let prefix = '>'
    let commandName = commands[i].usage
    let command = `${prefix}${commandName}`
    if (message.content.indexOf(command) === 0) {
      commands[i].cmd_function(message)
      logger.info(`${message.author.username}: ${message.content}
      > ${command.usage}`
      )
    }
  }
}
// Message Create Event
client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (message.author.id === client.user.id) return;
  forEachCommand(Commands, message)
  
})

// Start the bot (synchronous)
client.login(token)
