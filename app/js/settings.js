(() => {

    const $settingsDialog = document.getElementById('settings-dialog');

    const $uiThemeSheetElt = document.getElementById('ui-theme-sheet');

    // For populating UI language select list
    const $selectUILangInput = document.getElementById('select-ui-lang');
    const $selectUILang = $settingsDialog.querySelector('.mdl-menu[for="select-ui-lang"]');
    const $selectUILangItem = $selectUILang.getElementsByClassName('mdl-menu__item')[0];

    const $switchAutoUpdate = $settingsDialog.querySelector('[for="switch-auto-update-check"]');
    const $switchAutoUpdateInput = $switchAutoUpdate.getElementsByTagName('input')[0];

    const $switchWindowFrame = $settingsDialog.querySelector('[for="switch-window-frame"]');
    const $switchWindowFrameInput = $switchWindowFrame.getElementsByTagName('input')[0];

    const $switchLinuxControlsRight = $settingsDialog.querySelector('[for="switch-linux-controls-right"]');
    const $switchLinuxControlsRightInput = $switchLinuxControlsRight.getElementsByTagName('input')[0];

    // For populating UI themes select list
    const $uiThemesList = $settingsDialog.getElementsByClassName('preview-list')[0];
    const $uiThemesListItem = $uiThemesList.getElementsByClassName('preview-list-item')[0];




    const funcResetSettings = () => {
        if (Ufoco.Settings.strUILangSlug !== 'english') {
            $selectUILang.querySelector('[data-slug="english"]').click();
        }
        if (!Ufoco.Settings.boolAutoUpdateCheck) {
            $switchAutoUpdateInput.click();
        }
        if (Ufoco.Settings.boolWindowFrame) {
            $switchWindowFrameInput.click();
        }
        if (Ufoco.Settings.boolLinuxControlsRight) {
            $switchLinuxControlsRightInput.click();
        }
        if (Ufoco.Settings.strUIThemeSlug !== '_ORIGINAL_white-room') {
            $uiThemesList.querySelector('[data-slug="_ORIGINAL_white-room"]').click();
        }
    };


    // TODO [(Un)colored] : Lang switch function (no need to reload)
    const funcSetUIThemeLang = () => {

    };




    // Handling UI languages

    const arrFileNames = Ufoco.ElectronFramework.Fs.readdirSync(`${Ufoco.strAppPath}/lang/`);
    // For each UI language
    forEach(arrFileNames, (strFileName) => {
        // Create a UI language list item
        const $selectUILangItemClone = $selectUILangItem.cloneNode(true);
        $selectUILangItemClone.removeAttribute('hidden');
        $selectUILangItemClone.dataset.slug = strFileName.replace('.xml', '');

        // Trying to read the UI languages XML file.
        const strUILangXML = Ufoco.Functions.IO.funcReadFile({ strPath: `${Ufoco.strAppPath}/lang/${strFileName}` });

        if (strUILangXML) {
            const Parser = new DOMParser();
            const $UILangXML = Parser.parseFromString(strUILangXML, 'text/xml');

            // Getting the UI language name inside the file content
            $selectUILangItemClone.textContent = $UILangXML.getElementsByTagName('langname')[0].textContent;

            // Set UI lang on item click
            $selectUILangItemClone.addEventListener('click', () => {
                // If the clicked lang is different than the actual one
                if ($selectUILangItemClone.dataset.slug !== Ufoco.Settings.strUILangSlug) {
                    Ufoco.Settings.strUILangSlug = $selectUILangItemClone.dataset.slug;
                    Ufoco.Functions.IO.funcSaveSettings();
                }
            });

            if ($selectUILangItemClone.dataset.slug === Ufoco.Settings.strUILangSlug) {
                $selectUILangInput.value = $selectUILangItemClone.textContent;
            }

            $selectUILang.appendChild($selectUILangItemClone);
        }
    });




    // Handling UI themes

    const arrFolderNames = Ufoco.ElectronFramework.Fs.readdirSync(`${Ufoco.strAppPath}/themes/ui-themes/`);
    // For each interface theme
    forEach(arrFolderNames, (strFolderName) => {
        // Create a UI theme list item
        const $uiThemesListItemClone = $uiThemesListItem.cloneNode(true);
        $uiThemesListItemClone.removeAttribute('hidden');
        $uiThemesListItemClone.dataset.slug = strFolderName;

        // Trying to read the UI theme CSS file.
        const strUIThemeCSS = Ufoco.Functions.IO.funcReadFile({ strPath: `${Ufoco.strAppPath}/themes/ui-themes/${strFolderName}/style.css` });

        if (strUIThemeCSS) {
            // Getting the UI theme name inside the file content
            $uiThemesListItemClone.getElementsByClassName('mdl-list__item-primary-content')[0].textContent = strUIThemeCSS.match('- __themename: (.*) -')[1];
            $uiThemesListItemClone.getElementsByTagName('img')[0].src = `./themes/ui-themes/${strFolderName}/preview.png`;

            // Set UI theme on item click
            $uiThemesListItemClone.addEventListener('click', () => {
                // If the clicked theme is different than the actual one
                if ($uiThemesListItemClone.dataset.slug !== Ufoco.Settings.strUIThemeSlug || !$uiThemesList.getElementsByClassName('active')[0]) {
                    Ufoco.Settings.strUIThemeSlug = $uiThemesListItemClone.dataset.slug;
                    $uiThemeSheetElt.href = `${Ufoco.strAppPath}/themes/ui-themes/${strFolderName}/style.css`;
                    const $UIThemeSelected = $uiThemesList.getElementsByClassName('active')[0];
                    if ($UIThemeSelected) {
                        $UIThemeSelected.classList.remove('active');
                    }
                    $uiThemesListItemClone.classList.add('active');

                    Ufoco.Functions.IO.funcSaveSettings();
                }
            });

            $uiThemesList.appendChild($uiThemesListItemClone);
        }
    });

    // Selecting the corresponding UI theme in the list
    $uiThemesList.querySelector(`[data-slug="${Ufoco.Settings.strUIThemeSlug}"]`).click();



    // Handling app auto update check
    $switchAutoUpdateInput.addEventListener('click', () => {
        Ufoco.Settings.boolAutoUpdateCheck = !$switchAutoUpdate.classList.contains('is-checked');
        Ufoco.Functions.IO.funcSaveSettings();
    });

    // Handling app window frame
    $switchWindowFrameInput.addEventListener('click', () => {
        Ufoco.Settings.boolWindowFrame = !$switchWindowFrame.classList.contains('is-checked');
        Ufoco.Functions.IO.funcSaveSettings();
    });

    // Handling Linux controls side
    $switchLinuxControlsRightInput.addEventListener('click', () => {
        Ufoco.Settings.boolLinuxControlsRight = !$switchLinuxControlsRight.classList.contains('is-checked');

        if (Ufoco.Settings.boolLinuxControlsRight) {
            document.body.dataset.linuxcontrolsside = 'right';
        } else {
            document.body.dataset.linuxcontrolsside = 'left';
        }

        Ufoco.Functions.IO.funcSaveSettings();
    });


    $settingsDialog.getElementsByClassName('reset-button')[0].addEventListener('click', () => {
        funcResetSettings();
    });

    $settingsDialog.getElementsByClassName('settings-folder-button')[0].addEventListener('click', () => {
        Ufoco.ElectronFramework.Shell.showItemInFolder(Ufoco.strSettingsFilePath);
    });


    // First init of the auto update switch
    if ($switchAutoUpdate.classList.contains('is-checked') !== Ufoco.Settings.boolAutoUpdateCheck) {
        $switchAutoUpdateInput.click();
    }

    // First init of the window frame switch
    if ($switchWindowFrame.classList.contains('is-checked') !== Ufoco.Settings.boolWindowFrame) {
        $switchWindowFrameInput.click();
    }
    if (!Ufoco.Settings.boolWindowFrame) {
        document.body.classList.add('no-frame');
    }

    // First init of the Linux controls side switch
    if ($switchLinuxControlsRight.classList.contains('is-checked') !== Ufoco.Settings.boolLinuxControlsRight) {
        $switchLinuxControlsRightInput.click();
    }


    if (Ufoco.Settings.boolFirstStart) {
        Ufoco.$menuQuickGuideElt.click();
        Ufoco.Settings.boolFirstStart = false;
        Ufoco.Functions.IO.funcSaveSettings();
    }
})();