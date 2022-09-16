import { Message } from "discord.js-selfbot-v13"
import { Command, CommonArguments, SendMessage } from "../Deps"

function getRandomPfp(m: Message, a: CommonArguments): void {
    m.guild!.members.fetch().then(() => {
        let user = m.guild!.members.cache.random()?.user
        if (user)
            m.channel.send(user.displayAvatarURL({ size: 1024, dynamic: true }))
        else SendMessage("thrown unexpected error.", m)
    })
}
export default new Command('Gets the pfp of a random user', 'randompfp', (m, a) => getRandomPfp(m, a))