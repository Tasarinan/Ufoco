  // Load electron modules
  const electron = require('electron');
  // Module to control application life.
  const app = electron.app
      // Module to create native browser window.
  const BrowserWindow = electron.BrowserWindow

  // "fs" for "File System" : used to read and write files on disks.
  // Load node native modules
  const fs = require('fs');
  const path = require('path');
  const url = require('url');
  /**
   * Main Window class
   *
   *
   */

  class MainWindow {
      /**
       * create window
       *
       * @param {x} document The html document
       * @param {y} document The html document
       * @param {Object} settings Application settings coming from electron-config
       */

      constructor(x, y, settings) {
          this.x = x;
          this.y = y;
          this.settings = settings;
          this.mainWindow = null;
      }
      _createMainWindow() {
          let frame = false
          let alwaysOnTop = true

          if (process.env.NODE_ENV === 'development') {
              frame = true
              alwaysOnTop = false
          }

          //   menu.setApplicationMenu(menu.buildFromTemplate(arrMenuTemplate));
          //  menu.setApplicationMenu(arrMenu.createMenu());

          //create a instance of BrowserWindow
          this.mainWindow = new BrowserWindow({
              width: 960,
              height: 660,
              x: this.x,
              y: this.y,
              frame: frame,
              alwaysOnTop: alwaysOnTop,
              backgroundColor: this.settings.get('mainColor'),
              show: false

          });
          this.mainWindow.once('ready-to-show', () => {
              this.mainWindow.show()
          })

          // and load the index.html of the app.
          this.mainWindow.loadURL(url.format({
              pathname: path.join(__dirname, '../../index.html'),
              protocol: 'file:',
              slashes: true
          }));

          // http://stackoverflow.com/questions/31670803/prevent-electron-app-from-redirecting-when-dragdropping-items-in-window
          this.mainWindow.webContents.on('will-navigate', (Event) => {
              Event.preventDefault();
              return false;
          });

          // From http://stackoverflow.com/questions/32402327/how-can-i-force-external-links-from-browser-window-to-open-in-a-default-browser
          this.mainWindow.webContents.on('new-window', (Event, strURL) => {
              Event.preventDefault();
              shell.openExternal(strURL);
          });

          this.mainWindow.on('close', () => {
              getTrayMenu().items[0].checked = false
              appIcon.setContextMenu(getTrayMenu())
          })


          //Destroy when window is closed

          this.mainWindow.on('closed', () => {
              this.mainWindow = null;
          })

          if (process.env.DEBUG) {
              this.mainWindow.toggleDevTools();
          }
      }


      show() {
          if (!this.mainWindow) {
              _createMainWindow();
          } else {
              this.mainWindow.hide();
              this.mainWindow.show();
          }
      }
      toggleShow(checked) {
          if (!this.mainWindow) {
              _createMainWindow()
          } else {
              if (checked) {
                  mainWindow.show()
              } else {
                  mainWindow.hide()
              }
          }
      }

  }

  /**
   * Export app
   */

  module.exports = MainWindow