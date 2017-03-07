(() => {

    Ufoco.Functions.Window.funcPlatformDetect();

    Ufoco.$windowControlsElt.getElementsByClassName('close')[0].addEventListener('click', () => {
        Ufoco.Functions.Window.funcClose();
    });

    Ufoco.$windowControlsElt.getElementsByClassName('minimize')[0].addEventListener('click', () => {
        Ufoco.Functions.Window.funcMinimize();
    });

    Ufoco.$windowControlsElt.getElementsByClassName('toggle-maximize')[0].addEventListener('click', () => {
        Ufoco.Functions.Window.funcToggleMaximize();
    });

    Ufoco.$windowControlsElt.getElementsByClassName('toggle-fullscreen')[0].addEventListener('click', () => {
        Ufoco.Functions.Window.funcToggleFullscreen();
    });
    Mousetrap.bindGlobal(['f11', 'command+ctrl+f'], () => {
        Ufoco.Functions.Window.funcToggleFullscreen();
    });

    Ufoco.$windowControlsElt.getElementsByClassName('toggle-always-on-top')[0].addEventListener('click', () => {
        Ufoco.Functions.Window.funcToggleAlwaysOnTop();
    });

})();