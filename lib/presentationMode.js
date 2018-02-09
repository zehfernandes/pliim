// Pliim
const osascript = require("node-osascript");
const util = require("util");
const Store = require("electron-store");
const store = new Store();

const getWallpaper = util.promisify(callback => {
  osascript.executeFile(`./lib/getWallpaper.scpt`, function(err, result) {
    if (err) return console.error(err);
    callback(null, result);
  });
});

const changeWallpaper = (appPath, theList) => {
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
    const list = [
      "Macintosh HD:Library:Desktop Pictures:Solid Colors:Solid Mint.png",
      "Macintosh HD:Library:Desktop Pictures:Solid Colors:Solid Mint.png"
    ];
    const wallpaper = await getWallpaper();
    store.set("wallpaper", wallpaper);
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
