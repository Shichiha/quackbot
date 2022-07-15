const Discord = require('discord.js-selfbot-v13')
const { token } = require('./config.json')
const helper = require('./helper.js')
const logger = require('node-color-log')
const activities = require('./activities.json')
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

class Command {
  constructor (name, description, usage, cmd_function) {
    this.name = name
    this.description = description
    this.usage = usage
    this.cmd_function = cmd_function
  }
}
const messageCreateCommands = []
messageCreateCommands.push(
  new Command('ping', '?', 'ping', message => {
    message.channel.send('Pong!')
  }),
  new Command('uptime', 'How long the bot has been on', 'uptime', message => {
    let uptime = client.uptime
    let uptime_r = helper.msToRelativeTime(uptime) // Relative Time
    message.channel.send(`Uptime: ${uptime_r}`)
  }),
  new Command('help', 'All the functions and their usage', 'help', message => {
    let help_message = ''
    for (let i = 0; i < messageCreateCommands.length; i++) {
      help_message += `${messageCreateCommands[i].name}: ${messageCreateCommands[i].description}\nUsage: ${messageCreateCommands[i].usage}\n\n`
    }
    message.channel.send(help_message)
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
