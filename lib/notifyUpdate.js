const { ipcRenderer } = require('electron')
const fetch = require('electron-fetch')

function init(window) {
	checkForUpdates(window)
}

function checkForUpdates(window) {
	fetch(
		'https://api.github.com/repos/zehfernandes/pliim/releases/latest'
	)
		.then(res => res.json())
		.then(json => {
			let lastVersion = typeof json.tag_name != 'undefined' ? json.tag_name.slice(1) : '100.0.0'
			let version = require('../package').version
			if (parseFloat(lastVersion) > parseFloat(version)) {
				window.webContents.send('update-downloaded')
			}
		})
}

exports.init = init
exports.checkForUpdates = checkForUpdates