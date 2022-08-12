export function msToRelativeTime (ms: number) {
  var seconds = Math.floor((ms / 1000) % 60)
  var decimal = Math.floor(((ms / 1000) % 1) * 10)
  var minutes = Math.floor((ms / (1000 * 60)) % 60)
  var hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
  var days = Math.floor(ms / (1000 * 60 * 60 * 24))
  var result = ''
  if (days > 0) {
    result += days + 'd '
  }
  if (hours > 0) {
    result += hours + 'h '
  }
  if (minutes > 0) {
    result += minutes + 'm '
  }
  if (seconds > 0) {
    result += seconds + 's '
  }
  if (decimal > 0) {
    result += decimal + 'ms'
  }
  return result
}

export class Command {
  description: string
  usage: string
  cmd_function: (message: any) => void
  show_in_help: boolean
  constructor (description: string, usage: string, cmd_function: (message: any) => void, show_in_help: boolean = true) {
    this.description = description
    this.usage = usage
    this.cmd_function = cmd_function
    this.show_in_help = show_in_help
  }
}
