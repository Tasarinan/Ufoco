import { Tray, Menu, ipcMain } from 'electron';
import settings from 'electron-settings';

import {
  DESTROY_TRAY_ICON,
  UPDATE_TRAY_TIMER,
  UPDATE_TRAY_ICON,
  Phases,
  MediaControlTypes
} from '../../constants/AppSettings';
import { ElectronSettingsPaths } from '../../constants/ElectronSettings';

import { isLinux, isMacOS } from '../../utils/platform.util';
import { base } from '../../utils/path.util';
import repo from '../../../package.json';

class BiguTray {

  constructor() {
    this.menu = null;
    this.tray = null;
    this.window = null;
    this.icon = null;
    this.pauseTrayItem = null;
    this.resumeTrayItem = null;
  }


  init(win) {
    const { SHOW_TRAY_ICON } = ElectronSettingsPaths;
    const showTrayIcon = settings.get(SHOW_TRAY_ICON);

    this.window = win;
    this.setIcon();
    this.createMenu();
    this.setTrayListeners();

    if (showTrayIcon) {
      this.createTray();
    }

    return this;
  }

  createMenu() {
    this.menu = Menu.buildFromTemplate([
      {
        label: repo.productName,
        click: () => this.window.show()
      },
      {
        label: 'Pause',
        visible: false,
        click: () => this.window.webContents.send(MediaControlTypes.PAUSE)
      },
      {
        label: 'Resume',
        click: () => this.window.webContents.send(MediaControlTypes.RESUME)
      },
      {
        label: 'Minimize to tray',
        click: () => this.window.hide()
      },
      { type: 'separator' },
      {
        label: 'Quit',
        click: () => this.window.close()
      }
    ]);

    this.pauseTrayItem = this.menu.items.find(menuItem => menuItem.label === 'Pause');
    this.resumeTrayItem = this.menu.items.find(menuItem => menuItem.label === 'Resume');

    ipcMain.on(MediaControlTypes.PAUSE, () => {
      this.pauseTrayItem.visible = false;
      this.resumeTrayItem.visible = true;
    });

    ipcMain.on(MediaControlTypes.RESUME, () => {
      this.pauseTrayItem.visible = true;
      this.resumeTrayItem.visible = false;
    });
  }

  createTray = () => {
    this.tray = new Tray(this.icon);
    this.tray.setContextMenu(this.menu);
    this.tray.setToolTip(repo.productName);

    this.tray.on('double-click', () => this.window.show());
    ipcMain.on(UPDATE_TRAY_ICON, this.setTrayIcon);
    ipcMain.on(UPDATE_TRAY_TIMER, this.setTrayTitle);
  }

  setIcon() {
    this.icon = isLinux() || isMacOS()
      ? base('/assets/images/icon-mac.png')
      : base('/assets/images/icon-windows.png');
  }

  setTrayTitle = (e, time) => {
    const { SHOW_TIMER_BY_TRAY } = ElectronSettingsPaths;
    const showTimerByTray = settings.get(SHOW_TIMER_BY_TRAY);

    if (!showTimerByTray) {
      this.tray.setTitle('');
    }

    if (showTimerByTray) {
      this.tray.setTitle(time);
    }
  }

  setTrayIcon = (e, currentPhase) => {
    switch (currentPhase) {
      case Phases.IMMERSION: {
        this.tray.setImage(base('/assets/images/icon-focus@2x.png'));
        break;
      }

      case Phases.SHORT_BREAK: {
        this.tray.setImage(base('/assets/images/icon-short@2x.png'));
        break;
      }

      case Phases.LONG_BREAK: {
        this.tray.setImage(base('/assets/images/icon-long@2x.png'));
        break;
      }

      default: {
        this.tray.setImage(base('/assets/images/icon-windows.png'));
        return null;
      }
    }
  }

  setTrayListeners = () => {
    ipcMain.on(DESTROY_TRAY_ICON, () => {
      this.tray.destroy();
      ipcMain.removeListener(UPDATE_TRAY_ICON, this.setTrayIcon);
      ipcMain.removeListener(UPDATE_TRAY_TIMER, this.setTrayTitle);
    });
  }
}

export default new BiguTray();
