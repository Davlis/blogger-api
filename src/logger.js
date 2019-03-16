import Logger from 'winston'

let instance = null

export default function getLogger(level) {
  if (!instance) {
    instance = new Logger(level)
  }
  return instance
}
