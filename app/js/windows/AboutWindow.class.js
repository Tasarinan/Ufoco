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
   * About Window class
   *
   *
   */
  class AboutWindow {
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
          this.aboutWindow = null;
      }

      _createAboutWindow() {
          const modalPath = path.join('file://', __dirname, '../../about.html')
          this.aboutWindow = new BrowserWindow({
              x: this.x,
              y: this.y,
              resizable: false,
              minimizable: false,
              maximizable: false,
              fullscreenable: false,
              alwaysOnTop: true,
              titleBarStyle: 'hidden',
              backgroundColor: this.settings.get('mainColor'),
              title: `About UFOCO  v${app.getVersion()}`,
              show: false
          })
          this.aboutWindow.once('ready-to-show', () => {
              this.aboutWindow.show()
          })
          this.aboutWindow.loadURL(modalPath)
          if (process.env.NODE_ENV === 'development') {
              this.aboutWindow.setResizable(true);
              this.aboutWindow.on('resize', () => {
                  let size = this.aboutWindow.getScreenSize();
                  console.log(size);
              })
              this.aboutWindow.openDevTools();
          }
          this.aboutWindow.on('closed', () => {
              this.aboutWindow = null
          })
      }

      show() {

          if (!this.aboutWindow) {
              this._createAboutWindow();
          } else {
              this.aboutWindow.hide();
              this.aboutWindow.show();
          }
      }

  }

  /**
   * Export app
   */

  module.exports = AboutWindow