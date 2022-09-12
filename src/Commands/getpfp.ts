import { Command } from "../Deps"

export default new Command('Gets the pfp of a user', 'getpfp', (m, a) => {
    let args = a.message.content.split(' ')
    args = args.slice(1)
    let user = m.mentions.users.first() || args[0] ? a.client!.users.cache.find((user: any) => user.id === args[0] || user.username.toLowerCase().startsWith(args[0].toLowerCase())) : m.author
    return user
        ? m.channel.send(
            user.displayAvatarURL({ size: 1024, dynamic: true })
        )
        : m.channel.send('User not found')
})