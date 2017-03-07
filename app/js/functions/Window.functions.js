Ufoco.Functions.Window = {};


Ufoco.Functions.Window.funcClose = () => {
    window.close();
};

Ufoco.Functions.Window.funcMinimize = () => {
    Ufoco.ElectronFramework.CurrentWindow.minimize();
};

Ufoco.Functions.Window.funcToggleMaximize = () => {
    if (Ufoco.ElectronFramework.CurrentWindow.isMaximized()) {
        Ufoco.ElectronFramework.CurrentWindow.unmaximize();
    } else {
        Ufoco.ElectronFramework.CurrentWindow.maximize();
    }
};

Ufoco.Functions.Window.funcToggleFullscreen = () => {
    if (Ufoco.ElectronFramework.CurrentWindow.isFullScreen()) {
        Ufoco.ElectronFramework.CurrentWindow.setFullScreen(false);
        document.body.classList.remove('fullscreen');
    } else {
        Ufoco.ElectronFramework.CurrentWindow.setFullScreen(true);
        document.body.classList.add('fullscreen');
    }
};

Ufoco.Functions.Window.funcToggleAlwaysOnTop = () => {
    if (Ufoco.ElectronFramework.CurrentWindow.isAlwaysOnTop()) {
        Ufoco.ElectronFramework.CurrentWindow.setAlwaysOnTop(false);
        document.body.classList.remove('always-on-top');
    } else {
        Ufoco.ElectronFramework.CurrentWindow.setAlwaysOnTop(true);
        document.body.classList.add('always-on-top');
    }
};


Ufoco.Functions.Window.funcPlatformDetect = () => {
    if (process.platform === 'win32') {
        Ufoco.strOS = 'windows';
        document.body.classList.add('windows-os');
    } else if (process.platform === 'darwin') {
        Ufoco.strOS = 'osx';
        document.body.classList.add('osx-os');
    } else {
        Ufoco.strOS = 'linux';
        document.body.classList.add('linux-os');
    }
};