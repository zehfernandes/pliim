// Pliim

const fetch = require('electron-fetch');

const version = require('../package').version;

const checkForUpdates = window => {
  fetch(
    'https://api.github.com/repos/zehfernandes/pliim/releases/latest'
  ).then(res => res.json()).then(json => {
    const lastVersion = typeof json.tag_name !== 'undefined' ? json.tag_name.slice(1) : '100.0.0';

    if (parseFloat(lastVersion) > parseFloat(version)) {
      window.webContents.send('update-downloaded');
    }
  });
};

const init = window => {
  checkForUpdates(window);
};

module.exports = {
  init,
  checkForUpdates
};
