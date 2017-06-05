/*jslint node:true*/
/*jslint esversion: 6*/

"use strict"

// Load electron modules
const electron = require('electron');
// Module to control application life.
const app = electron.app
    // Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
    // Module to create tray icon
const Tray = electron.Tray
    // Module to create context meny for tray icon
const Menu = electron.Menu
    // Module to create ipcMain for ipc
const ipcMain = electron.ipcMain
    //Module to create nativeImage for image/icon
const nativeImage = electron.nativeImage;

const shell = electron.shell
const dialog = electron.dialog

// "fs" for "File System" : used to read and write files on disks.
// Load node native modules
const fs = require('fs');
const path = require('path');
const url = require('url');


const IdeasLoader = require('./js/classes/IdeasLoader.class.js');
const BreaksPlanner = require('./js/classes/BreaksPlanner.class.js');
const AppSettings = require('./js/settings/Settings.class.js');
const defaultSettings = require('./js/settings/Settings.default.js');
const TrayMenu = require('./js/menu/TrayMenu.class.js');

let appIcon = null;

let microbreakWin = null;
let breakWin = null;

let splashScreenWin = null;
let evernoteWin = null;

let finishMicrobreakTimer = null;
let finishBreakTimer = null;
let resumeBreaksTimer = null;

let microbreakIdeas;
let breakIdeas;
let breakPlanner;

global.shared = {
    isNewVersion: false
}
var screenWidth = null;
var screenHeight = null;
let settings;
let trayMenu;


function displaysX(width = 800) {

    let theScreen = electron.screen.getDisplayNearestPoint(electron.screen.getCursorScreenPoint());
    let bounds = theScreen.bounds;
    return bounds.x + ((bounds.width - width) / 2);
}

function displaysY(height = 600) {
    let theScreen = electron.screen.getDisplayNearestPoint(electron.screen.getCursorScreenPoint())
    let bounds = theScreen.bounds
    return bounds.y + ((bounds.height - height) / 2)
}

function getScreenSize() {
    screenWidth = electron.screen.getPrimaryDisplay().workAreaSize.width;
    screenHeight = electron.screen.getPrimaryDisplay().workAreaSize.height;
}

const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
    if (appIcon) {
        console.log("");
    }
});

if (shouldQuit) {
    console.log('app should be already running');
    app.quit();
}

// Show window when app is ready
//app.on('ready', createSplashScreenWin);
app.on('ready', loadSettings);
app.on('ready', installDevtools);
app.on('ready', planBreak);
app.on('ready', createTrayIcon);

function createTrayIcon() {
    if (process.platform === 'darwin') {
        app.dock.hide()
    }
    const iconPath = path.join(__dirname, './img/tagtime.png');
    const icon = nativeImage.createFromPath(iconPath)
    icon.setTemplateImage(true)
        // appIcon = new Tray(iconPath);
    appIcon = new Tray(icon);
    appIcon.setToolTip(require('../package.json').description);
    trayMenu = new TrayMenu(displaysX(), displaysY(), appIcon, settings);
    // appIcon.setContextMenu(getTrayMenu());
    /* appIcon.on('right-click', () => {
         show();
     })*/
}

function createSplashScreenWin() {
    splashScreenWin = new BrowserWindow({
        show: false,
        width: 640,
        height: 480,
        backgroundColor: '#ececec',
        frame: false
    })
    splashScreenWin.loadURL(url.format({
        pathname: path.join(__dirname, './views/splash.html'),
        protocol: 'file:',
        slashes: true
    }))
    splashScreenWin.webContents.on('did-finish-load', () => {
        splashScreenWin.show();
        planVersionCheck();
    })
}



function planVersionCheck(seconds = 1) {
    setTimeout(checkVersion, seconds * 1000)
}

function checkVersion() {
    splashScreenWin.webContents.send('checkVersion', `v${app.getVersion()}`)
    planVersionCheck(3600 * 5)
}


function planBreak() {
    let nb = breakPlanner.nextBreak
    if (nb) {
        nb.plan()
    }
}

function loadSettings() {
    const strAppUserData = app.getPath('userData');
    const settingsFile = `${strAppUserData}/settings.json`;
    settings = new AppSettings(settingsFile);
    breakPlanner = new BreaksPlanner(settings, startMicrobreak, startBreak);
}

function installDevtools() {
    const devtoolsInstaller = require('electron-devtools-installer')
    devtoolsInstaller.default(devtoolsInstaller.REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension: ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
}

function startMicrobreak() {
    if (!microbreakIdeas) {
        loadIdeas();
    }

    //don't start another break if break running
    if (microbreakWin) {
        console.log('microbreak already running');
        return;
    }
    const modalPath = path.join('file://', __dirname, './views/microbreak.html');
    microbreakWin = new BrowserWindow({
        x: displaysX(),
        y: displaysY(),
        frame: false,
        show: false,
        fullscreen: settings.get('fullscreen'),
        backgroundColor: settings.get('mainColor'),
        title: 'Ufoco'
    });
    microbreakWin.loadURL(modalPath);
    // microbreakWin.webContents.openDevTools()
    microbreakWin.webContents.on('did-finish-load', () => {
        microbreakWin.webContents.send('microbreakIdea', microbreakIdeas.randomElement, settings.get('microbreakStrictMode'))
        microbreakWin.setAlwaysOnTop(true)
        microbreakWin.show()
        finishMicrobreakTimer = setTimeout(finishMicrobreak, settings.get('microbreakDuration'))
    })
}

function startBreak() {
    if (!breakIdeas) {
        loadIdeas();
    }
    //don't start another break if break running

    if (breakWin) {
        console.log('break already running');
        return;
    }
    const modalPath = path.join('file://', __dirname, './views/break.html')
    breakWin = new BrowserWindow({
        x: displaysX(),
        y: displaysY(),
        frame: false,
        show: false,
        fullscreen: settings.get('fullscreen'),
        backgroundColor: settings.get('mainColor'),
        title: 'Ufoco'
    })
    breakWin.loadURL(modalPath)
        // breakWin.webContents.openDevTools()
    breakWin.webContents.on('did-finish-load', () => {
        breakWin.webContents.send('breakIdea', breakIdeas.randomElement, settings.get('breakStrictMode'))
        breakWin.setAlwaysOnTop(true)
        breakWin.show()
        finishBreakTimer = setTimeout(finishBreak, settings.get('breakDuration'))
    })

}

function finishMicrobreak(shouldPlaySound = true) {
    if (shouldPlaySound) {
        splashScreenWin.webContents.send('playSound', settings.get('audio'))
    }
    microbreakWin.close()
    microbreakWin = null
    breakPlanner.nextBreak.plan()
}

function finishBreak(shouldPlaySound = true) {
    if (shouldPlaySound) {
        splashScreenWin.webContents.send('playSound', settings.get('audio'))
    }
    breakWin.close()
    breakWin = null
    breakPlanner.nextBreak.plan()
}

function loadIdeas() {
    let breakIdeasData
    let microbreakIdeasData
    if (settings.get('useIdeasFromSettings')) {
        breakIdeasData = settings.get('breakIdeas')
        microbreakIdeasData = settings.get('microbreakIdeas')
    } else {
        breakIdeasData = require('./js/defaultBreakIdeas')
        microbreakIdeasData = require('./js/defaultMicrobreakIdeas')
    }
    breakIdeas = new IdeasLoader(breakIdeasData).ideas()
    microbreakIdeas = new IdeasLoader(microbreakIdeasData).ideas()
}

function pauseBreaks(seconds) {
    if (microbreakWin) {
        clearTimeout(finishMicrobreakTimer)
        finishMicrobreak()
    }
    if (breakWin) {
        clearTimeout(finishBreakTimer)
        finishBreak()
    }
    breakPlanner.pause()
    if (seconds !== 1) {
        resumeBreaksTimer = setTimeout(resumeBreaks, seconds)
    }
    isPaused = true
    appIcon.setContextMenu(getTrayMenu())
}

function resumeBreaks() {
    clearTimeout(resumeBreaksTimer)
    isPaused = false
    let nb = breakPlanner.resume()
    if (nb) {
        nb.plan()
        appIcon.setContextMenu(getTrayMenu())
        splashScreenWin.webContents.send('showNotification', 'Resuming breaks')
    }
}


function saveDefaultsFor(array, next) {
    for (let index in array) {
        settings.set(array[index], defaultSettings[array[index]])
    }
}



ipcMain.on('finish-microbreak', function(event, shouldPlaySound) {
    clearTimeout(finishMicrobreakTimer)
    finishMicrobreak(shouldPlaySound)
})

ipcMain.on('finish-break', function(event, shouldPlaySound) {
    clearTimeout(finishBreakTimer)
    finishBreak(shouldPlaySound)
})

ipcMain.on('save-setting', function(event, key, value) {
    settings.set(key, value)
    prefsWindow.webContents.send('renderSettings', settings.data)
    appIcon.setContextMenu(getTrayMenu())
})

ipcMain.on('update-tray', function(event) {
    appIcon.setContextMenu(getTrayMenu())
    if (splashScreenWin) {
        splashScreenWin.hide();
    }
})

ipcMain.on('set-default-settings', function(event, data) {
    const options = {
        type: 'info',
        title: 'Reset to defaults',
        message: 'Are you sure you wanna reset setings on this window to defaults?',
        buttons: ['Yes', 'No']
    }
    dialog.showMessageBox(options, function(index) {
        if (index === 0) {
            saveDefaultsFor(data)
            prefsWindow.webContents.send('renderSettings', settings.data)
        }
    })
})

// Exit application when all window is closed.
app.on('window-all-closed', () => {
    /*
    if (process.platform != 'darwin') {
        app.quit();
    }*/
})