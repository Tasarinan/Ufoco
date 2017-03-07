/*jslint node:true*/
/*jslint esversion: 6*/


// Load electron modules
const { app, BrowserWindow, Tray, Menu, ipcMain, shell, dialog } = require('electron');

const arrMenu = require('./js/menu');

// "fs" for "File System" : used to read and write files on disks.
// Load node native modules
const fs = require('fs');
const path = require('path');
const url = require('url');


const markdownExt = /\.(md|mdm|mkdn|mark.*|txt)$/

var winList = [];
var screenWidth = null;
var screenHeight = null;

const strAppUserData = app.getPath('userData');

let settings

try {
    //Accesssing settings here for window related settings.
    settings = JSON.parse(fs.readFileSync(`${strAppUserData}/settings.min.json`, 'utf8'));
} catch (Error) {}

let boolWindowFrame = false;

if (settings) {
    if (settings.boolWindowFrame) {
        boolWindowFrame = true;
    }
}


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
function createWindow() {
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

function getScreenSize() {
    screenWidth = electron.screen.getPrimaryDisplay().workAreaSize.width;
    screenHeight = electron.screen.getPrimaryDisplay().workAreaSize.height;
}



// Show window when app is ready
app.on('ready', () => {
        let ignoreList = [];
        let isFile = false;
        let program = getArguments();

        getScreenSize();
        if (program.args.length) {
            program.args.forEach((element) => {
                let fullpath = element;
                if (!path.isAbsolute(element)) {
                    fullpath = path.resolve(process.cwd(), element);
                }
                try {
                    isFile = fs.statSync(fullpath).isFile();
                } catch (error) {
                    isFile = false;
                }
                if (isFile && markdownExt.test(fullpath)) {
                    let winIndex = winList.push(createWindow()) - 1;
                    winList[winIndex].webContents.on('dom-ready', () => {
                        winList[winIndex].webContents.send('open-file', fullpath);
                    })
                } else {
                    ignoreList.push(`${fullpath} isn't file.`);
                }
            });
        }
        if (!winList.length) {
            winList.push(createWindow());
        }
        if (ignoreList.length) {
            dialog.showMessageBox({
                title: "Warning",
                type: "warning",
                message: 'Ignore below arguments.',
                detail: ignoreList.join('\n'),
                buttons: ['OK']
            });
        }

    })
    // Exit application when all window is closed.
app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
})

//get default path
function getDefaultPath(currentFile) {
    let defaultPath = "";

    if (currentFile == "") {
        defaultPath = path.join(app.getPath('documents'), 'new_file');
    } else {
        defaultPath = path.join(path.dirname(currentFile), path.basename(currentFile, path.extname(currentFile)));
    }
    return defaultPath;
}

ipc.on('new-file', () => {
    winList.push(createWindow());
});