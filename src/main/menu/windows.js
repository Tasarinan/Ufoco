import { shell, dialog} from 'electron';
import { autoUpdater } from 'electron-updater';
import settings from 'electron-settings';

import { LOAD_SETTINGS } from '../../constants/AppSettings';

import { openReleaseNotes } from '../../utils/release-notes.util';


import repo from '../../../package.json';

export default function buildWindowsMenu(win) {
  return [
    {
      label: '&File',
      submenu: [
        {
          label: '&Settings',
          click() {
            win.webContents.send(LOAD_SETTINGS);
          }
        },
        {
          label: '&Quit',
          accelerator: 'Ctrl+W',
          click() {
            win.close();
          }
        }
      ]
    },
    {
      label: '&Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: '&View',
      submenu: process.env.NODE_ENV === 'development'
        ? [
          {
            label: '&Reload',
            accelerator: 'Ctrl+R',
            click() {
              win.webContents.reload();
            }
          },
          {
            label: 'Toggle &Full Screen',
            accelerator: 'F11',
            click() {
              win.setFullScreen(!win.isFullScreen());
            }
          },
          {
            label: 'Toggle &Developer Tools',
            accelerator: 'Alt+Ctrl+I',
            click() {
              win.toggleDevTools();
            }
          }
        ]
        : [
          {
            label: 'Toggle &Full Screen',
            accelerator: 'F11',
            click() {
              win.setFullScreen(!win.isFullScreen());
            }
          }
        ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'hide' },
        { role: 'close' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: () => {
            dialog.showMessageBox(win, {
              type: 'info',
              title: 'About',
              message: 'Working in progress',
              detail: 'You can find him on GitHub.'
            });
          }
        },
        {
          label: 'Learn More',
          click() {
            shell.openExternal(repo.repository.url);
          }
        },
        {
          label: 'Documentation',
          click() {
            shell.openExternal(repo.readme);
          }
        },
        {
          label: 'Release Notes',
          click() {
            const version = settings.get('version');
            openReleaseNotes(version);
          }
        },
        { type: 'separator' },
        {
          label: 'Search Issues',
          click() {
            shell.openExternal(repo.bugs.url);
          }
        },
        {
          label: 'Report Issue',
          click() {
            shell.openExternal(repo.bugs.url);
          }
        },
        { type: 'separator' },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Ctrl+Shift+J',
          click() {
            win.toggleDevTools();
          }
        },
        { type: 'separator' },
        {
          label: 'Check for Updates...',
          click() {
            autoUpdater.checkForUpdates();
          }
        }
      ]
    }
  ];
}
