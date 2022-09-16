import { Message, User } from "discord.js-selfbot-v13"
import { Command, CommonArguments, SendMessage } from "../Deps"


function getUser(m: Message): User | undefined {
    let args = m.content.split(' ')
    let user: User | undefined
    if (args.length > 1) {
        user = m.mentions.users.first()
        if (!user) {
            user = m.client.users.cache.get(args[1])
        }
        if (!user) {
            user = m.client.users.cache.find(u => u.username.toLowerCase() == args[1] || u.tag.toLowerCase().startsWith(args[1].toLowerCase()))
        }
    }
    return user
}
function getPfp(m: Message, a: CommonArguments): void {
    let user = getUser(m)
    if (user)
        m.channel.send(user.displayAvatarURL({ size: 1024, dynamic: true }))
    else SendMessage("could not find user :(", m)
}
export default new Command('Gets the pfp of a user', 'getpfp', (m, a) => getPfp(m, a))
