const Discord = require('discord.js-selfbot-v13')
const { token } = require('./config.json')
const logger = require('node-color-log')
const activities = require('./activities.json')
const safeEval = require('safe-eval')
const {msToRelativeTime, Command} = require('./helper.js')
logger.setDate(() => new Date().toLocaleTimeString())

const client = new Discord.Client({
  checkUpdate: false
})

const activities_list = activities.activities

client.on('ready', () => {
  console.log('Bot is online!')
  console.log(`Logged in as ${client.user.tag}!`)
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1)
    client.user.setActivity(activities_list[index])
  }, 5000)
})

const messageCreateCommands = []
messageCreateCommands.push(
  new Command('ping', '?', 'ping', message => {
    message.channel.send('Pong!')
  }),
  new Command('uptime', 'How long the bot has been on', 'uptime', message => {
    let uptime = client.uptime
    let uptime_r = `${msToRelativeTime(uptime)} ago`
    message.channel.send(`Uptime: ${uptime_r}`)
  }),
  new Command('help', 'All the functions and their usage', 'help', message => {
    let help_message = ''
    for (let i = 0; i < messageCreateCommands.length; i++) {
      help_message += `${messageCreateCommands[i].name}: ${messageCreateCommands[i].description}\nUsage: ${messageCreateCommands[i].usage}\n\n`
    }
    message.channel.send(help_message)
  }),
  new Command('eval', 'Evaluates a code snippet', 'eval', message => {
    code = ''
    try {
      let code = message.content.split('```')[1].split('```')[0]
      logger.info(`${message.author.username} evaled: ${code}`)
      try {
        let result = safeEval(code)
        message.channel.send(`Result: ${result}`)
      } catch (err) {
        message.channel.send(`${err}`)
      }
    } catch (error) {
      message.channel.send(`Error: ${error}`)
    }
  })
)

client.on('messageCreate', async message => {
  if (message.author.bot) return
  for (let i = 0; i < messageCreateCommands.length; i++) {
    let prefix = '>'
    let commandName = messageCreateCommands[i].name
    let command = `${prefix}${commandName}`
    if (message.content.indexOf(command) === 0) {
      messageCreateCommands[i].cmd_function(message)
      logger.info(`${message.author.username}: ${message.content}`)
      logger.colorLog(
        {
          font: 'black',
          bg: 'yellow'
        },
        `Command Activated: ${messageCreateCommands[i].name}`
      )
    }
  }
})
client.login(token)
