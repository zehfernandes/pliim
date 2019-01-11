// Pliim
const osascript = require("node-osascript");
const util = require("util");
const fs = require("fs");
const Store = require("electron-store");
const store = new Store();

const getWallpaper = util.promisify((appPath, callback) => {
  osascript.executeFile(`${appPath}/lib/getWallpaper.scpt`, function(
    err,
    result
  ) {
    if (err) return console.error(err);
    callback(null, result);
  });
});

const changeWallpaper = (appPath, theList) => {
  console.log(theList);
  osascript.executeFile(
    `${appPath}/lib/setWallpaper.scpt`,
    { theList: theList },
    function(err, result, raw) {
      if (err) {
        return console.log(err);
      }
    }
  );
};

const sanitizeForAppleScript = path => {
  return path.replace("/", ":").substr(1);
};

const hideDesktop = util.promisify((appPath, callback) => {
  osascript.executeFile(`${appPath}/lib/desktop.scpt`, function(err, result) {
    callback(null);
  });
});

const turnOn = async (options = {}, appPath) => {
  if (options.notification) {
    osascript.executeFile(`${appPath}/lib/notification.scpt`);
  }

  if (options.mute) {
    osascript.executeFile(`${appPath}/lib/mute.scpt`);
  }

  if (options.wallpaper) {
    const defaultWallpaper = sanitizeForAppleScript(
      `/${appPath}/static/img/defaultWallpaper.png`
    );
    const selectedWallpaper = store.get("selectedWallpaper");
    let list = [defaultWallpaper, defaultWallpaper];

    if (selectedWallpaper) {
      if (fs.existsSync(selectedWallpaper)) {
        list = [
          sanitizeForAppleScript(selectedWallpaper),
          sanitizeForAppleScript(selectedWallpaper)
        ];
      }
    }

    const wallpaper = await getWallpaper(appPath);
    changeWallpaper(appPath, list);
  }

  if (options.desktop) {
    await hideDesktop(appPath);
  }

  if (options.apps) {
    osascript.executeFile(`${appPath}/lib/hideapps.scpt`);
  }
};

const turnOff = appPath => {
  osascript.executeFile(`${appPath}/lib/turnOff.scpt`);

  const list = store.get("wallpaper");
  if (list) {
    changeWallpaper(appPath, list);
  }
};

module.exports = {
  turnOn,
  turnOff
};
