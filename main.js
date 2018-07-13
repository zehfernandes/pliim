// Pliim

const path = require("path");
const { BrowserWindow, Menu, ipcMain, shell, app } = require("electron");
const AutoLaunch = require("auto-launch");
const menubar = require("menubar");

const { turnOff, turnOn } = require("./lib/presentationMode");
const autoUpdater = require("./lib/notifyUpdate.js");

const { wasOpenedAtLogin } = app.getLoginItemSettings();

const Store = require("electron-store");
const store = new Store();

const mb = menubar({
  preloadWindow: true,
  width: 360,
  height: 320,
  transparent: true,
  frame: false,
  icon: path.join(__dirname, "static", "img", "iconTemplate.png")
});

let prefsWindow;

mb.on("ready", () => {
  const tray = mb.tray;

  /* Pliim Core */
  ipcMain.on("turnOn", (event, options) => {
    tray.setImage(
      path.join(__dirname, "static", "img", "activeIconTemplate.png")
    );

    turnOn(options, app.getAppPath());
  });

  ipcMain.on("turnOff", () => {
    tray.setImage(path.join(__dirname, "static", "img", "iconTemplate.png"));

    turnOff(app.getAppPath());
  });

  /* Update */
  ipcMain.on("install-update", event => {
    if (event === "install-update") {
      shell.openExternal("https://github.com/zehfernandes/pliim/releases");
    }
  });

  /* Configs */
  ipcMain.on("storeConfig", (event, options) => {
    store.set("configs", options);
  });

  ipcMain.on("getConfig", (event, options) => {
    const configs = store.get("configs");
    if (configs) event.sender.send("listeningConfigs", configs);
  });

  autoUpdater.init(mb.window);

  mb.window.once("ready-to-show", () => {
    if (wasOpenedAtLogin) {
      return;
    }

    const positioner = mb.positioner;
    positioner.move("trayCenter", tray.getBounds());

    mb.window.show();
    mb.window.focus();
    // mb.window.toggleDevTools();

    tray.setHighlightMode("always");
  });

  /* -----------
Preference Window
------------ */
  const openPrefsWindow = () => {
    if (prefsWindow) {
      return prefsWindow.show();
    }

    prefsWindow = new BrowserWindow({
      width: 400,
      height: 400,
      resizable: false,
      minimizable: false,
      maximizable: false,
      //titleBarStyle: "hidden",
      show: false
    });

    prefsWindow.on("close", () => {
      prefsWindow = undefined;
    });

    prefsWindow.loadURL(`file://${__dirname}/preferences.html`);
    prefsWindow.on("ready-to-show", () => {
      prefsWindow.show();
    });
  };

  ipcMain.on("getConfig", (event, options) => {});

  /* -----------
    Menu
  ------------ */

  const contextMenu = Menu.buildFromTemplate([
    {
      role: "about",
      label: "About Pliim"
    },
    {
      label: "Check for updates",
      click: () => {
        shell.openExternal(
          "https://github.com/zehfernandes/pliim/releases/latest"
        );
      }
    },
    {
      label: "Preferences",
      click: () => {
        openPrefsWindow();
      }
    },
    {
      type: "separator"
    },
    {
      label: "Quit",
      click: () => {
        app.quit();
      }
    }
  ]);

  mb.tray.on("click", event => {
    if (event.ctrlKey || event.altKey) {
      mb.tray.popUpContextMenu(contextMenu);
    }
  });

  mb.tray.on("right-click", () => {
    mb.tray.popUpContextMenu(contextMenu);
  });
});

/* -----------
Second Instance
------------ */

const isSecondInstance = app.makeSingleInstance(() => {
  // Someone tried to run a second instance, we should focus our window.
  if (mb.window) {
    mb.window.show();
  }
});

if (isSecondInstance) {
  app.quit();
}

/* -----------
Auto-Laucher
------------ */

function toogleAutoLauch() {
  const autoLaucher = store.get("laucher");
  if (autoLaucher || autoLaucher === true) {
    pliimAutoLauncher.enable();
  } else {
    pliimAutoLauncher.disable();
  }
}

const pliimAutoLauncher = new AutoLaunch({
  name: "Pliim",
  path: "/Applications/Pliim.app"
});

const autoLaucher = store.get("laucher");

if (autoLaucher || autoLaucher === true) {
  pliimAutoLauncher.enable();
} else {
  pliimAutoLauncher.disable();
}

pliimAutoLauncher
  .isEnabled()
  .then(isEnabled => {
    if (isEnabled) {
      return;
    }
  })
  .catch(err => {
    console.error(err);
  });
