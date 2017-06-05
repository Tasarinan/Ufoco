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
   * Prefs Window class
   *
   *
   */
  class SettingsWindow {
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
          this.settingsWindow = null;
      }

      _createSettingsWindow() {
          const modalPath = path.join('file://', __dirname, 'settings.html')
          this.settingsWindow = new BrowserWindow({
              x: this.x,
              y: this.y,
              resizable: false,
              minimizable: false,
              maximizable: false,
              fullscreenable: false,
              alwaysOnTop: true,
              backgroundColor: this.settings.get('mainColor'),
              title: 'Settings',
              show: false
          })
          this.settingsWindow.once('read-to-show', () => {
              this.settingsWindow.show();
          })

          this.settingsWindow.loadURL(modalPath);
          if (process.env.NODE_ENV === 'development') {
              this.settingsWindow.openDevTools()
          }
          this.settingsWindow.webContents.on('did-finish-load', () => {
              this.settingsWindow.webContents.send('renderSettings', this.settings.data)
          })
          this.settingsWindow.on('closed', () => {
              this.settingsWindow = null
          })
      }

      show() {

          if (!this.settingsWindow) {
              this._createSettingsWindow();
          } else {
              this.settingsWindow.hide();
              this.settingsWindow.show();
          }
      }

  }

  /**
   * Export app
   */

  module.exports = SettingsWindow