import { Message } from "discord.js-selfbot-v13";
import { Command, CommonArguments, LogError } from "../Deps";
import { genshinAchievement } from "genshinachievement";
async function sendimage(m: Message, a: CommonArguments) {
    let args = m.content.split(" ");
    let content = args.slice(1).join(" ")
    try {
        const imagestream = await genshinAchievement(content)
        if (!imagestream) return;
        m.reply({ files: [imagestream] })
    } catch (e) {
        LogError(e as Error)
    }
    

}
export default new Command("Use genshin achievement maker to get a custom achievement based on your input", "ga", (m, a) =>
    sendimage(m, a)
);
