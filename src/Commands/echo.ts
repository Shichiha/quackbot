import { Command, SendMessage } from "../Deps"

export default new Command('Echoes back what you say', 'echo', (m, a) => {
    let args = a.message.content.split(' ')
    args = args.slice(1)
    SendMessage(args.join(' ')+"+", m)
})