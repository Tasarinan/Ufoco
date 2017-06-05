const { ipcRenderer, shell, remote } = require('electron');
let VersionChecker = require('./classes/VersionChecker.class.js');


ipcRenderer.on('playSound', (event, data) => {
    let audio = new Audio(`../audio/${data}.wav`);
    audio.play();
})

ipcRenderer.on('checkVersion', (event, data) => {
    if (remote.getGlobal('shared').isNewVersion) {
        notifyNewVersion();
    } else {
        new VersionChecker().latest(function(version) {
            if (version !== 'Error getting latest version' && data !== version) {
                remote.getGlobal('shared').isNewVersion = true
                ipcRenderer.send('update-tray')
                notifyNewVersion()
            }
        })
    }
});

ipcRenderer.on('showNotification', (event, data) => {
    new Notification('UFoco', {
        body: data
    })
})

function notifyNewVersion() {
    let notification = new Notification('UFoco', {
        body: 'New version is available!'
    })
    notification.onclick = () => shell.openExternal('https://github.com/Tasarinan/ufoco/releases')
}