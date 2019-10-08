import { Menu } from 'electron';
import darwinMenuBuilder from './darwin';
import windowsMenuBuilder from './windows';

import { isDev, isDebugProd } from '../../utils/env.util';
import { isMacOS } from '../../utils/platform.util';

class BiguMenu {

  constructor() {
    this.menu = null;
    this.template = null;
    this.window = null;
  }

  init(win) {
    this.window = win;
    if (isDev() || isDebugProd()) this.setupDevelopmentEnvironment();
    this.createTemplate();
    this.createMenu();
    return this;
  }

  createTemplate() {
    this.template = isMacOS()
      ? darwinMenuBuilder(this.window)
      : windowsMenuBuilder(this.window);
  }

  createMenu() {
    this.menu = Menu.buildFromTemplate(this.template);
    Menu.setApplicationMenu(this.menu);
  }

  setupDevelopmentEnvironment() {
    this.window.openDevTools();
    this.window.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;
      Menu
        .buildFromTemplate([{
          label: 'Inspect element',
          click: () => {
            this.window.inspectElement(x, y);
          }
        }])
        .popup(this.window);
    });
  }
}

export default new BiguMenu();
