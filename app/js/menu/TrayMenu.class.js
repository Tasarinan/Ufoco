'use strict'

/**
 * Dependencies
 */

const fs = require('fs')

const path = require('path')

const { app, Menu, Tray, globalShortcut } = require('electron')

const MainWindow = require('../windows/MainWindow.class.js');
const AboutWindow = require('../windows/AboutWindow.class.js');
const SettingsWindow = require('../windows/SettingsWindow.class.js');
let mainWindow;
let aboutWindow;
let settingsWindow;
class TrayMenu {
    /**
     * Create the main menu for the given app
     */

    constructor(x, y, appIcon, settings) {
        this.appIcon = appIcon;
        this.settings = settings;
        mainWindow = new MainWindow(x, y, settings);
        aboutWindow = new AboutWindow(x, y, settings);
        settingsWindow = new SettingsWindow(x, y, settings);
        this.contextMenu = null;
        this._createTemplate()
        this.appIcon.setContextMenu(this.contextMenu);
        this.appIcon.on('right-click', () => {
            mainWindow.show();
            this.contextMenu.items[0].checked = true
            this.appIcon.setContextMenu(this.contextMenu)
        })
    }
    _createTemplate() {
        this.contextMenu = Menu.buildFromTemplate([{
            label: 'Show',
            type: 'checkbox',
            checked: true,
            accelerator: this.settings.get('shortcutShow'),
            click: this._toggleShow()
        }, {
            type: 'separator'
        }, {
            label: 'Preferences...',
            click: function() {
                settingsWindow.show();
            }

        }, {
            label: 'About',
            // click: openAboutWindow
            click: function() {
                aboutWindow.show();
            }
        }, {
            type: 'separator'
        }, {
            label: 'Quit',
            click: function() {
                app.quit()
            }
        }])
    }

    _toggleShow() {
        if (!this.contextMenu)
            return;
        if (this.contextMenu.items[0].checked === true) {
            mainWindow.toggleShow(true);
        } else {
            mainWindow.toggleShow(false);
        }
    }

    _setGlobalShortcuts() {
        globalShortcut.unregisterAll()

        globalShortcut.register(this.settings.get('shortcutShow'), () => {
            this.contextMenu.items[0].checked = !this.contextMenu.items[0].checked
            _toggleShow()
            this.appIcon.setContextMenu(this.contextMenu)
        })
    }



}

/**
 * Export TrayMenu
 */

module.exports = TrayMenu