// Packages
const Discord = require('discord.js-selfbot-v13')
const logger = require('node-color-log')
const fs = require('fs')
const request = require('request')
const { exec } = require('child_process')

// Internal Resources
const { token, prefix } = require('./config.json')
const LID = require('./LID.js')
const { msToRelativeTime, Command } = require('./helper.js')
const activities_list = require('./activities.json')

// Logging
if (!fs.existsSync('./logs')) {
  fs.mkdirSync('./logs')
}
logger.setDate(() => new Date().toLocaleTimeString())

// Client
const client = new Discord.Client({ checkUpdate: false })
client.on('ready', () => {
  logger.info('hello world')
  logger.info(`Logged in as ${client.user.tag}!`)
  // Setting User Activity (Playing a random activity)
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1)
    client.user.setActivity(activities_list[index])
  }, 5000)
})

const blacklist = ['926104536723111976', '959905847268495401']

// A "Safe" Message (Just in case string is too long)
function message_ (to_send, msg) {
  if (to_send.length >= 500) {
    let dn = Date.now()
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
        let __ = JSON.parse(body)
        let ___ = __.data.url.id
        msg.channel.send(`https://crepe.moe/c/${___}`)
      }
    )
  } else if (to_send.length <= 0) {
    return
  } else {
    msg.channel.send(to_send)
  }
}

// A "safe" evaluator which uses rextest.com
function rextest_eval (code, lcw, extra_args) {
  let url = 'https://rextester.com/rundotnet/Run'
  let data = {
    LanguageChoiceWrapper: lcw,
    EditorChoiceWrapper: '1',
    LayoutChoiceWrapper: '1',
    Program: code,
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

// Evaluate Command Helper
function Eval_ (id, message, extra_args) {
  let code = message.content
    .split(' ')
    .slice(1)
    .join(' ')
  logger.info(`Evaluating ${code}`)
  rextest_eval(code, id, extra_args)
    .then(body => {
      let body_ = JSON.parse(body)
      let to_send = body_.Result

      if (body_.Errors != null) {
        to_send += body_.Errors
      }
      if (body_.Warnings != null) {
        to_send += body_.Warnings
      }
      message_(to_send, message)
      logger.info(body)
    })
    .catch(err => {
      logger.error(err)
    })
}

// All the commands!
const Commands = []
Commands.push(
  new Command('All the functions and their usage', 'help', message => {
    // Help
    let help_message = ''
    for (let i = 0; i < Commands.length; i++) {
      if (Commands[i].show_in_help) {
        help_message += `${Commands[i].description}\nUsage: ${Commands[i].usage}\n\n`
      }
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
  new Command('Gets the pfp of a user', 'getpfp', async (message, args) => {
    let user = message.mentions.users.first() || args[0]?  client.users.cache.find( user => user.id === args[0] || user.username.toLowerCase().startsWith(args[0].toLowerCase())) : message.author
    return user
      ? message.channel.send(
          user.displayAvatarURL({ size: 1024, dynamic: true })
        )
      : message.channel.send('User not found')
  }),

  // Echo
  new Command('Echoes back what you say', 'echo', (message, args) => {
    let echo_message = args.join(' ')
    message_(echo_message, message)
  }),

  // Update
  new Command(
    'Updates the bot',
    'update',
    message => {
      exec('git pull', err => {
        if (err) {
          logger.error(err)
        }
      })
      process.exit()
    },
    false
  ),

  // Quack
  new Command('Quacks', 'quack', message => {
    message_('Quack!', message)
  })
)

// Eval Commands!
for (let i in LID) {
  let language = LID[i]
  Commands.push(
    new Command(
      `Evaluates a ${language.language} code snippet`,
      `${i}`,
      message => {
        Eval_(language.id, message, language.ExtraArgs)
      },
      false
    )
  )
}

// Message Create Event
client.on('messageCreate', async message => {
  if (
    message.author.bot ||
    message.author.id == client.user.id ||
    !message.content.startsWith(prefix) ||
    blacklist.includes(message.author.id)
  )
    return
  const args = message.content.split(' ')
  Commands.find(e => e.usage == args[0].slice(prefix.length))?.cmd_function(
    message,
    args.slice(1)
  )
  logger.info(`${message.author.username} > ${args[0]}`)
})

// Start the bot (synchronous)
client.login(token)
