import { app, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import settings from 'electron-settings';

import { LOAD_SETTINGS } from '../../constants/AppSettings';

import { openReleaseNotes } from '../../utils/release-notes.util';

import repo from '../../../package.json';

export default function buildDarwinMenu(win) {
  const subMenuAbout = {
    label: repo.productName,
    submenu: [
      { label: 'About', selector: 'orderFrontStandardAboutPanel:' },
      { type: 'separator' },
      {
        label: 'Check for Updates...',
        click() {
          autoUpdater.checkForUpdates();
        }
      },
      {
        label: 'Preferences',
        submenu: [
          {
            label: '&Settings',
            accelerator: 'Command+,',
            click() {
              win.webContents.send(LOAD_SETTINGS);
            }
          }
        ]
      },
      { label: 'Hide', accelerator: 'Command+H', selector: 'hide:' },
      {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      },
      { label: 'Show All', selector: 'unhideAllApplications:' },
      { type: 'separator' },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit();
        }
      }
    ]
  };
  // View Menu
  const commonSubMenuView = [

    { type: 'separator' },
    {
      label: 'Toggle Full Screen',
      accelerator: 'Ctrl+Command+F',
      click() {
        win.setFullScreen(!win.isFullScreen());
      }
    },
    {
      label: 'Toggle Compact Mode',
      accelerator: 'Ctrl+Command+M',
      click() {
        if (win.isFullScreen()) win.setFullScreen(false);
      }
    }
  ];

  const subMenuViewDev = {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'Command+R',
        click() {
          win.webContents.reload();
        }
      },
      {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          win.setFullScreen(!win.isFullScreen());
        }
      },
      { type: 'separator' },
      ...commonSubMenuView,
      {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click() {
          win.toggleDevTools();
        }
      }
    ]
  };

  const subMenuViewProd = {
    label: 'View',
    submenu: [
      ...commonSubMenuView,
    ]
  };

  const subMenuWindow = {
    label: 'Window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      },
      { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
      { type: 'separator' },
      { label: 'Bring All to Front', selector: 'arrangeInFront:' }
    ]
  };
  const subMenuHelp = {
    label: 'Help',
    submenu: [
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
        click() {
          win.toggleDevTools();
        }
      }
    ]
  };

  const subMenuView = process.env.NODE_ENV === 'development'
    ? subMenuViewDev
    : subMenuViewProd;

  return [subMenuAbout, subMenuView, subMenuWindow, subMenuHelp];
}
