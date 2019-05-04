// Pliim
const isOnline = require("is-online");
const version = require("../package").version;

const checkForUpdates = window => {
  const { net } = require("electron");
  const request = net.request(
    "https://api.github.com/repos/zehfernandes/pliim/releases/latest"
  );
  request.on("response", response => {
    response.on("data", chunk => {
      const json = JSON.parse(chunk);
      const lastVersion =
        typeof json.tag_name !== "undefined"
          ? json.tag_name.slice(1)
          : "100.0.0";

      if (parseFloat(lastVersion) > parseFloat(version)) {
        window.webContents.send("update-downloaded");
      }
    });
  });

  request.end();
};

const init = window => {
  if (!isOnline()) {
    return;
  }

  checkForUpdates(window);
};

module.exports = {
  init,
  checkForUpdates
};
