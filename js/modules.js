// Only one namespace
const Ufoco = {};
Ufoco.ElectronFramework = {};
Ufoco.Functions = {};
Ufoco.boolDevMode = true;

Ufoco.ElectronFramework.Electron = require('electron');

// Uses to access main process things. More info here :
// http://electron.atom.io/docs/api/remote/
Ufoco.ElectronFramework.Remote = Ufoco.ElectronFramework.Electron.remote;

// Get access to the BrowserWindow object which this web page belongs to.
Ufoco.ElectronFramework.CurrentWindow = Ufoco.ElectronFramework.Remote.getCurrentWindow();

// Hide application menu bar
Ufoco.ElectronFramework.CurrentWindow.setMenuBarVisibility(false);

if (Ufoco.boolDevMode) {
    Ufoco.ElectronFramework.CurrentWindow.webContents.openDevTools();
    // show application menu bar
    Ufoco.ElectronFramework.CurrentWindow.setMenuBarVisibility(true);
}

// Module to control application life.
Ufoco.ElectronFramework.App = Ufoco.ElectronFramework.Remote.app;
// Used to handle native dialog windows
Ufoco.ElectronFramework.Dialog = Ufoco.ElectronFramework.Remote.dialog;

// Used to trigger native commands
Ufoco.ElectronFramework.Shell = Ufoco.ElectronFramework.Electron.shell;
// Used to handle clipboard data
Ufoco.ElectronFramework.Clipboard = Ufoco.ElectronFramework.Electron.clipboard;

// "fs" for "File System" : used to read and write files on disks.
Ufoco.ElectronFramework.Fs = require('fs');

// manipulate path string
Ufoco.ElectronFramework.Path = require('path');