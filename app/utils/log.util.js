//Log
export default {
  logToFile: true,

  log() {
    const dt = new Date()
    let cons,
      args = Array.prototype.slice.call(arguments, 0)
    let dtf = `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}.${dt.getMilliseconds()}`

    args.unshift(dtf)

    if (this.gui && global.window) {
      cons = global.window.console
    } else {
      cons = console
    }

    if (this.logToFile) {
      this.debug(args)
    }

    args.unshift('\n')
    cons.log.apply(cons, args)
  },
  _cnc(args) {
    let txt = ''
    for (let i in args) txt += JSON.stringify(args[i]) + ' '
    return txt
  },
  debug(args) {
    const fs = require('fs'),
      txt = this._cnc(args)
    fs.writeFileSync('npm-debug.log', txt + '\n', { flag: 'a' })
  }
};


