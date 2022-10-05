import { Message } from "discord.js-selfbot-v13";
import { Command, CommonArguments, Log, SendMessage } from "../Dependencies";

function sendPfp(m: Message, a: CommonArguments): void {
    if (!m.guild) {
        SendMessage("this command can only be used in a guild", m)
        return
    }
    let args = m.content.split(" ");
    let user: any;
    m.guild.members.fetch().then((s) => {
        user = s.find(
            (u) =>
                u.user.username
                    .toLowerCase()
                    .startsWith(args.slice(1).join(" ")) ||
                u.displayName.toLowerCase().startsWith(args.slice(1).join(" "))
        );
        let url = user
            ? user.displayAvatarURL({
                size: 1024,
                dynamic: true,
                format: "png",
            })
            : null;
        url != null
            ? m.channel.send({ files: [url] })
            : m.channel.send("couldnt find");
    });
}
export default new Command("Gets the pfp of a user", "getpfp", (m, a) =>
    sendPfp(m, a)
);
