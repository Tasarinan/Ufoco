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


const arrMenu = require('./js/menu');

// "fs" for "File System" : used to read and write files on disks.
// Load node native modules
const fs = require('fs');
const path = require('path');
const url = require('url');


const IdeasLoader = require('./js/classes/IdeasLoader.class.js');
const BreaksPlanner = require('./js/classes/BreaksPlanner.class.js');
const AppSettings = require('./js/classes/Settings.class.js');
const defaultSettings = require('./js/defaultSettings.js');

let appIcon = null;
let ankiWin = null;
let microbreakWin = null;
let breakWin = null;
let aboutWin = null;
let splashScreenWin = null;
let evernoteWin = null;
let settingsWin = null;
let finishMicrobreakTimer = null;
let finishBreakTimer = null;
let resumeBreaksTimer = null;

let microbreakIdeas;
let breakIdeas;
let breakPlanner;


const markdownExt = /\.(md|mdm|mkdn|mark.*|txt)$/

var screenWidth = null;
var screenHeight = null;
let settings;

//Parse command line arguments
function getArguments() {
    let argv = [];
    let tmp_args = [];
    let tmp_opts = [];

    if (/^electron/.test(path.basename(process.argv[0]))) {
        argv = process.argv.slice(2);

    } else {
        argv = process.argv.slice(1);
    }
    argv.forEach((element) => {
        if (/^-/.test(element) === true) {
            tmp_opts.push(element);
        } else {
            tmp_args.push(element);
        }
    });
    return { opts: tmp_opts, args: tmp_args };

}


// If this is the first instance, continue the execution of this script.
// create window
function showNotesWindow() {
    let mainWindow = null;

    //   menu.setApplicationMenu(menu.buildFromTemplate(arrMenuTemplate));
    menu.setApplicationMenu(arrMenu.createMenu());

    //create a instance of BrowserWindow
    mainWindow = new BrowserWindow({
        width: 960,
        height: 660,
        x: winList.length * 20 % (screenWidth - 960),
        y: winList.length * 20 % (screenHeight - 660),
        frame: boolWindowFrame,
        icon: path.join(__dirname, '../img/ufoco.png')

    });

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // http://stackoverflow.com/questions/31670803/prevent-electron-app-from-redirecting-when-dragdropping-items-in-window
    mainWindow.webContents.on('will-navigate', (Event) => {
        Event.preventDefault();
        return false;
    });

    // From http://stackoverflow.com/questions/32402327/how-can-i-force-external-links-from-browser-window-to-open-in-a-default-browser
    mainWindow.webContents.on('new-window', (Event, strURL) => {
        Event.preventDefault();
        shell.openExternal(strURL);
    });

    //Destroy when window is closed

    mainWindow.on('closed', () => {
        mainWindow = null;
    })

    if (process.env.DEBUG) {
        mainWindow.toggleDevTools();
    }
    return mainWindow;
}

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
    if (appIcon && ankiWin) {
        if (ankiWin.isMinized()) {
            ankiWin.restore();
            // ankiWin.focus();
        }
    }
});

if (shouldQuit) {
    console.log('app should be already running');
    app.quit();
}

// Show window when app is ready
app.on('ready', createSplashScreenWin);
app.on('ready', loadSettings);
app.on('ready', planBreak);
app.on('ready', createTrayIcon);

function createTrayIcon() {
    if (process.platform === 'darwin') {
        app.dock.hide()
    }
    const iconPath = path.join(__dirname, 'sandglass.png');
    appIcon = new Tray(iconPath);
    appIcon.setToolTip(require('./package.json').description);
    appIcon.setContextMenu(getTrayMenu())
}

function getTrayMenu(hasNewVersion) {

    let trayMenu = [];
    if (hasNewVersion) {
        trayMenu.push({
            label: 'Download latest version',
            click: function() {
                shell.openExternal('https://github.com/hovancik/stretchly/releases')
            }
        })
    }
    trayMenu.push({
        label: 'About',
        click: function() {
            showAboutWindow();
        }
    }, {
        type: 'separator'
    });

    if (!settings.get('isPaused')) {
        let submenu = [];

        if (settings.get('microbreak')) {
            submenu = submenu.concat([{
                label: 'microbreak',
                click: function() {
                    breakPlanner.skipToMicrobreak().plan();
                }
            }])
        }
        if (settings.get('break')) {
            submenu = submenu.concat([{
                label: 'break',
                click: function() {
                    breakPlanner.skipToBreak().plan();
                }
            }])
        }

        if (settings.get('break') || settings.get('microbreak')) {
            trayMenu.push({
                label: 'Skip to the next',
                submenu: submenu
            })
        }

    }

    if (settings.get('isPaused')) {
        trayMenu.push({
            label: 'Resume',
            click: function() {
                resumeBreaks();
            }
        })
    } else {
        trayMenu.push({
            label: 'Pause',
            submenu: [{
                label: 'for an hour',
                click: function() {
                    pauseBreaks(3600 * 1000);
                }
            }, {
                label: 'for 2 hours',
                click: function() {
                    pauseBreaks(3600 * 2 * 1000);
                }
            }, {
                label: 'for 5 hours',
                click: function() {
                    pauseBreaks(3600 * 5 * 1000);
                }
            }, {
                label: 'indefinitely',
                click: function() {
                    pauseBreaks(1)
                }
            }]
        }, {
            label: 'Reset breaks',
            click: function() {
                breakPlanner.reset();
            }
        })
    }
    trayMenu.push({
        label: 'Pomodoro',
        click: function() {
            showPomodoroWindow();
        }
    });
    trayMenu.push({
        label: 'Anki',
        click: function() {
            showAnkiWindow();
        }
    });
    trayMenu.push({
        label: 'Notes',
        click: function() {
            showNotesWindow();
        }
    });
    trayMenu.push({
        label: 'Settings',
        click: function() {
            showSettingsWindow();
        }
    });

    if (process.platform === 'darwin' || process.platform === 'win32') {
        let loginItemSettings = app.getLoginItemSettings();
        let openAtLogin = loginItemSettings.openAtLogin;
        trayMenu.push({
            label: 'Start at login',
            type: 'checkbox',
            checked: openAtLogin,
            click: function() {
                app.setLoginItemSettings({
                    openAtLogin: !openAtLogin
                })
            }
        })

    }
    trayMenu.push({
        type: 'separator'
    }, {
        label: 'Quit',
        click: function() {
            app.quit();
        }
    })
    return Menu.buildFromTemplate(trayMenu);

}

function createSplashScreenWin() {
    splashScreenWin = new BrowserWindow({
        show: false,
        width: 640,
        height: 480,
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

function showEvernoteWin() {
    // Create the browser window and disable node.js (it is needed to work with pre-compiled js of external url)
    evernoteWin = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: { nodeIntegration: false },
        show: true
    })

    //load the url
    evernoteWin.loadURL('https://www.evernote.com/Home.action')

    //hide the default menu
    evernoteWin.setMenu(null)

    //prevent window title changing
    evernoteWin.on('page-title-updated', event => {
        event.preventDefault()
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

function showAboutWindow() {
    if (aboutWin) {
        aboutWin.show()
        return
    }
    const modalPath = path.join('file://', __dirname, './views/about.html')
    aboutWin = new BrowserWindow({
        x: displaysX(),
        y: displaysY(),
        resizable: false,
        backgroundColor: settings.get('mainColor'),
        title: `About stretchly v${app.getVersion()}`
    })
    aboutWin.loadURL(modalPath)
}

function showPomodoroWindow() {
    showEvernoteWin();
}

function showSettingsWindow() {
    if (settingsWin) {
        settingsWin.show()
        return
    }
    const modalPath = path.join('file://', __dirname, 'settings.html')
    settingsWin = new BrowserWindow({
        x: displaysX(),
        y: displaysY(),
        resizable: false,
        backgroundColor: settings.get('mainColor'),
        title: 'Settings'
    })
    settingsWin.loadURL(modalPath)
        // settingsWin.webContents.openDevTools()
    settingsWin.webContents.on('did-finish-load', () => {
        settingsWin.webContents.send('renderSettings', settings.data)
    })
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
    settingsWin.webContents.send('renderSettings', settings.data)
    appIcon.setContextMenu(getTrayMenu())
})

ipcMain.on('update-tray', function(event, hasNewVersion) {
    appIcon.setContextMenu(getTrayMenu(hasNewVersion))
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
            settingsWin.webContents.send('renderSettings', settings.data)
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