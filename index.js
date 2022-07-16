const Discord = require('discord.js-selfbot-v13')
const { token } = require('./config.json')
const logger = require('node-color-log')
const activities = require('./activities.json')
const safeEval = require('safe-eval')
const { msToRelativeTime, Command } = require('./helper.js')
// check if there's a database.json file
const fs = require('fs')
if (!fs.existsSync('./database.json')) {
  fs.writeFileSync('./database.json', '{}')
}
const database = require('./database.json')
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
  new Command('getpfp', 'Gets the pfp of a user', 'getpfp', message => {
    let user = message.mentions.users.first()
    if (user) {
      message.channel.send(`${user.avatarURL()}?size=4096`)
    } else {
      message.channel.send(`no user, wat?`)
    }
  }),
  new Command('echo', 'Echoes back what you say', 'echo', message => {
    let blocked= ['?echo']
    let args = message.content.split(' ')
    let echo_message = ''
    for (let i = 1; i < args.length; i++) {
      echo_message += `${args[i]} `
    }
    for (let i = 0; i < blocked.length; i++) {
      if (echo_message.includes(blocked[i])) {
        echo_message = `"${echo_message}"`
      }
    }
    message.channel.send(echo_message)
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
        `> : ${messageCreateCommands[i].name}`
      )
    }
  }
})
client.login(token)
