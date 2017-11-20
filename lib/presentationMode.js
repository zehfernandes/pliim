const osascript = require('node-osascript')
const resolve = require('path').resolve;
console.log(resolve)

function turnOn(options = {}, appPath) {
  if (options.desktop) {
    console.log(appPath)
    osascript.executeFile(`${appPath}/lib/desktop.scpt`)
  }
  if (options.notification) {
    osascript.executeFile(`${appPath}/lib/notification.scpt`)
  }
  if (options.apps) {
    osascript.executeFile(`${appPath}/lib/hideapps.scpt`)
  }
}

function turnOff(appPath) {
  osascript.executeFile(`${appPath}/lib/turnOff.scpt`, function (err, result, raw) {
    if (err) {
      return console.log(err);
    }
  })
}

function presentationModeIsOn() {
  osascript.execute('defaults read com.apple.finder CreateDesktop', function (err, result, raw) {
    if (result == 1) return true

    return false
  })
}

module.exports = {
  turnOn,
  turnOff
}
