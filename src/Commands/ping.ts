import { Command } from "../Deps";

export default new Command("?", "ping", (m, a) => {
    m.channel.send(
        `🏓 Pong!\nLatency is ${Date.now() - m.createdTimestamp
        }ms.\nAPI Latency is ${Math.round(a!.client!.ws.ping)}ms`
    );
})