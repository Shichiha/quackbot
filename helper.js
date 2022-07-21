function msToRelativeTime (ms) {
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
class Command {
  constructor ( description, usage, cmd_function, show_in_help = true ) {
    this.usage = usage
    this.description = description
    this.cmd_function = cmd_function
    this.show_in_help = show_in_help
  }
}
module.exports = {
    msToRelativeTime,
    Command
}
