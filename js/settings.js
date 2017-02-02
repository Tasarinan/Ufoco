(() => {

    const $settingsDialog = document.getElementById('settings-dialog');

    const $uiThemeSheetElt = document.getElementById('ui-theme-sheet');

    // For populating UI language select list
    const $selectUILangInput = document.getElementById('select-ui-lang');
    const $SelectUILang = $settingsDialog.querySelector('.mdl-menu[for="select-ui-lang"]');
    const $SelectUILangItem = $SelectUILang.getElementsByClassName('mdl-menu__item')[0];

    const $SwitchAutoUpdate = $settingsDialog.querySelector('[for="switch-auto-update-check"]');
    const $SwitchAutoUpdateInput = $SwitchAutoUpdate.getElementsByTagName('input')[0];

    const $SwitchWindowFrame = $settingsDialog.querySelector('[for="switch-window-frame"]');
    const $SwitchWindowFrameInput = $SwitchWindowFrame.getElementsByTagName('input')[0];

    const $SwitchLinuxControlsRight = $settingsDialog.querySelector('[for="switch-linux-controls-right"]');
    const $SwitchLinuxControlsRightInput = $SwitchLinuxControlsRight.getElementsByTagName('input')[0];

    // For populating UI themes select list
    const $UIThemesList = $settingsDialog.getElementsByClassName('preview-list')[0];
    const $UIThemesListItem = $UIThemesList.getElementsByClassName('preview-list-item')[0];




    const funcResetSettings = () => {
        if (Ufoco.Settings.strUILangSlug !== 'english') {
            $SelectUILang.querySelector('[data-slug="english"]').click();
        }
        if (!Ufoco.Settings.boolAutoUpdateCheck) {
            $SwitchAutoUpdateInput.click();
        }
        if (Ufoco.Settings.boolWindowFrame) {
            $SwitchWindowFrameInput.click();
        }
        if (Ufoco.Settings.boolLinuxControlsRight) {
            $SwitchLinuxControlsRightInput.click();
        }
        if (Ufoco.Settings.strUIThemeSlug !== '_ORIGINAL_white-room') {
            $UIThemesList.querySelector('[data-slug="_ORIGINAL_white-room"]').click();
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
        const $SelectUILangItemClone = $SelectUILangItem.cloneNode(true);
        $SelectUILangItemClone.removeAttribute('hidden');
        $SelectUILangItemClone.dataset.slug = strFileName.replace('.xml', '');

        // Trying to read the UI languages XML file.
        const strUILangXML = Ufoco.Functions.IO.funcReadFile({ strPath: `${Ufoco.strAppPath}/lang/${strFileName}` });

        if (strUILangXML) {
            const Parser = new DOMParser();
            const $UILangXML = Parser.parseFromString(strUILangXML, 'text/xml');

            // Getting the UI language name inside the file content
            $SelectUILangItemClone.textContent = $UILangXML.getElementsByTagName('langname')[0].textContent;

            // Set UI lang on item click
            $SelectUILangItemClone.addEventListener('click', () => {
                // If the clicked lang is different than the actual one
                if ($SelectUILangItemClone.dataset.slug !== Ufoco.Settings.strUILangSlug) {
                    Ufoco.Settings.strUILangSlug = $SelectUILangItemClone.dataset.slug;
                    Ufoco.Functions.IO.funcSaveSettings();
                }
            });

            if ($SelectUILangItemClone.dataset.slug === Ufoco.Settings.strUILangSlug) {
                $selectUILangInput.value = $SelectUILangItemClone.textContent;
            }

            $SelectUILang.appendChild($SelectUILangItemClone);
        }
    });




    // Handling UI themes

    const arrFolderNames = Ufoco.ElectronFramework.Fs.readdirSync(`${Ufoco.strAppPath}/themes/ui-themes/`);
    // For each interface theme
    forEach(arrFolderNames, (strFolderName) => {
        // Create a UI theme list item
        const $UIThemesListItemClone = $UIThemesListItem.cloneNode(true);
        $UIThemesListItemClone.removeAttribute('hidden');
        $UIThemesListItemClone.dataset.slug = strFolderName;

        // Trying to read the UI theme CSS file.
        const strUIThemeCSS = Ufoco.Functions.IO.funcReadFile({ strPath: `${Ufoco.strAppPath}/themes/ui-themes/${strFolderName}/style.css` });

        if (strUIThemeCSS) {
            // Getting the UI theme name inside the file content
            $UIThemesListItemClone.getElementsByClassName('mdl-list__item-primary-content')[0].textContent = strUIThemeCSS.match('- __themename: (.*) -')[1];
            $UIThemesListItemClone.getElementsByTagName('img')[0].src = `../themes/ui-themes/${strFolderName}/preview.png`;

            // Set UI theme on item click
            $UIThemesListItemClone.addEventListener('click', () => {
                // If the clicked theme is different than the actual one
                if ($UIThemesListItemClone.dataset.slug !== Ufoco.Settings.strUIThemeSlug || !$UIThemesList.getElementsByClassName('active')[0]) {
                    Ufoco.Settings.strUIThemeSlug = $UIThemesListItemClone.dataset.slug;
                    $uiThemeSheetElt.href = `${Ufoco.strAppPath}/themes/ui-themes/${strFolderName}/style.css`;
                    const $UIThemeSelected = $UIThemesList.getElementsByClassName('active')[0];
                    if ($UIThemeSelected) {
                        $UIThemeSelected.classList.remove('active');
                    }
                    $UIThemesListItemClone.classList.add('active');

                    Ufoco.Functions.IO.funcSaveSettings();
                }
            });

            $UIThemesList.appendChild($UIThemesListItemClone);
        }
    });

    // Selecting the corresponding UI theme in the list
    $UIThemesList.querySelector(`[data-slug="${Ufoco.Settings.strUIThemeSlug}"]`).click();



    // Handling app auto update check
    $SwitchAutoUpdateInput.addEventListener('click', () => {
        Ufoco.Settings.boolAutoUpdateCheck = !$SwitchAutoUpdate.classList.contains('is-checked');
        Ufoco.Functions.IO.funcSaveSettings();
    });

    // Handling app window frame
    $SwitchWindowFrameInput.addEventListener('click', () => {
        Ufoco.Settings.boolWindowFrame = !$SwitchWindowFrame.classList.contains('is-checked');
        Ufoco.Functions.IO.funcSaveSettings();
    });

    // Handling Linux controls side
    $SwitchLinuxControlsRightInput.addEventListener('click', () => {
        Ufoco.Settings.boolLinuxControlsRight = !$SwitchLinuxControlsRight.classList.contains('is-checked');

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
    if ($SwitchAutoUpdate.classList.contains('is-checked') !== Ufoco.Settings.boolAutoUpdateCheck) {
        $SwitchAutoUpdateInput.click();
    }

    // First init of the window frame switch
    if ($SwitchWindowFrame.classList.contains('is-checked') !== Ufoco.Settings.boolWindowFrame) {
        $SwitchWindowFrameInput.click();
    }
    if (!Ufoco.Settings.boolWindowFrame) {
        document.body.classList.add('no-frame');
    }

    // First init of the Linux controls side switch
    if ($SwitchLinuxControlsRight.classList.contains('is-checked') !== Ufoco.Settings.boolLinuxControlsRight) {
        $SwitchLinuxControlsRightInput.click();
    }


    if (Ufoco.Settings.boolFirstStart) {
        Ufoco.$menuQuickGuideElt.click();
        Ufoco.Settings.boolFirstStart = false;
        Ufoco.Functions.IO.funcSaveSettings();
    }
})();