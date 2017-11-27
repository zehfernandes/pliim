// Pliim

const osascript = require('node-osascript');

const turnOn = (options = {}, appPath) => {
  if (options.desktop) {
    osascript.executeFile(`${appPath}/lib/desktop.scpt`);
  }

  if (options.notification) {
    osascript.executeFile(`${appPath}/lib/notification.scpt`);
  }

  if (options.apps) {
    osascript.executeFile(`${appPath}/lib/hideapps.scpt`);
  }

  if (options.mute) {
    osascript.executeFile(`${appPath}/lib/mute.scpt`);
  }
};

const turnOff = appPath => {
  osascript.executeFile(`${appPath}/lib/turnOff.scpt`);
};

module.exports = {
  turnOn,
  turnOff
};
