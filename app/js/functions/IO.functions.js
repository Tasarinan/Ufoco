Ufoco.Functions.IO = {};


Ufoco.Functions.IO.funcIOErrorCheck = (parameters) => {
    try {
        // Execute and return whatever funcToTry returns
        return parameters.funcToTry();
    } catch (Error) {
        Ufoco.Functions.Dialogs.funcShow({ strDialogSlug: 'io-error' });
        if (parameters.funcCatch) {
            parameters.funcCatch();
        }
        console.error(Error);
        return false;
    }
};



Ufoco.Functions.IO.funcReadFile = (parameter) => {
    // Return whatever funcToTry returns
    return Ufoco.Functions.IO.funcIOErrorCheck({
        funcToTry: () => {
            return Ufoco.ElectronFramework.Fs.readFileSync(parameter.strPath, 'utf8');
        }
    });
};



Ufoco.Functions.IO.funcLoadSettings = () => {
    Ufoco.Settings;

    try {
        Ufoco.Settings = JSON.parse(Ufoco.ElectronFramework.Fs.readFileSync(Ufoco.strSettingsFilePath, 'utf8'));
        Ufoco.Functions.IO.funcSettingsLegacy();
    } catch (Error) {
        Ufoco.Settings = {
            boolWindowFrame: false,
            boolFirstStart: true,
            strUIThemeSlug: 'light',
            strUILangSlug: 'english',
            boolAutoUpdateCheck: true,
            boolLinuxControlsRight: false
        };

        Ufoco.Functions.IO.funcSaveSettings();
    }
};



Ufoco.Functions.IO.funcSaveSettings = () => {
    Ufoco.Functions.IO.funcIOErrorCheck({
        funcToTry: () => {
            Ufoco.ElectronFramework.Fs.writeFileSync(Ufoco.strSettingsFilePath, JSON.stringify(Ufoco.Settings), 'utf8');
        }
    });
};



// Settings object compatibility with previous versions of the app
Ufoco.Functions.IO.funcSettingsLegacy = () => {
    let boolModified = false;

    if (!Ufoco.Settings.hasOwnProperty('boolWindowFrame')) {
        Ufoco.Settings.boolWindowFrame = false;
        boolModified = true;
    }
    if (!Ufoco.Settings.hasOwnProperty('boolLinuxControlsRight')) {
        Ufoco.Settings.boolLinuxControlsRight = false;
        boolModified = true;
    }

    if (boolModified) {
        Ufoco.Functions.IO.funcSaveSettings();
    }
};



Ufoco.Functions.IO.funcLoadDocThemesLibs = () => {
    Ufoco.Functions.IO.funcIOErrorCheck({
        funcToTry: () => {
            const strDocThemesLibrariesPath = `${Ufoco.strAppPath}/themes/doc-themes/lib`;
            Ufoco.DocThemesLibraries = {};

            // Lib
            Ufoco.DocThemesLibraries.strNormalizeCSS = Ufoco.ElectronFramework.Fs.readFileSync(`${strDocThemesLibrariesPath}/normalize.custom.min.css`, 'utf8');

            Ufoco.DocThemesLibraries.strHighlightJS = Ufoco.ElectronFramework.Fs.readFileSync(`${strDocThemesLibrariesPath}/highlight.pack.custom.min.js`, 'utf8');

            Ufoco.DocThemesLibraries.strEmojisCSS = Ufoco.ElectronFramework.Fs.readFileSync(`${strDocThemesLibrariesPath}/emojify.pack.min.css`, 'utf8');
            Ufoco.DocThemesLibraries.strEmojisJS = Ufoco.ElectronFramework.Fs.readFileSync(`${strDocThemesLibrariesPath}/emojify.min.js`, 'utf8');

            // Common code
            Ufoco.DocThemesLibraries.strDocumentCSS = Ufoco.ElectronFramework.Fs.readFileSync(`${strDocThemesLibrariesPath}/document.css`, 'utf8');
            Ufoco.DocThemesLibraries.strDocumentJS = Ufoco.ElectronFramework.Fs.readFileSync(`${strDocThemesLibrariesPath}/document.js`, 'utf8');
        }
    });
};



Ufoco.Functions.IO.funcLoadEmojis = () => {
    // Return whatever funcToTry returns
    return Ufoco.Functions.IO.funcIOErrorCheck({
        funcToTry: () => {
            // https://github.com/github/gemoji/blob/master/db/emoji.json
            return JSON.parse(Ufoco.ElectronFramework.Fs.readFileSync(`${Ufoco.strAppPath}/json/emojis-list.json`, 'utf8'));
        }
    });
};



// Parameters :
// - strSavePath
// - strFormat
// - strDocThemeSlug
// - $ContentEditable
Ufoco.Functions.IO.funcSaveDoc = (Parameters) => {
    // Return whatever funcToTry returns
    return Ufoco.Functions.IO.funcIOErrorCheck({
        funcToTry: () => {
            const $ContentEditableClone = Parameters.$ContentEditable.cloneNode(true);

            const strDocThemePath = `${Ufoco.strAppPath}/themes/doc-themes/themes-dir/${Parameters.strDocThemeSlug}`;
            let strDocContent = '';

            if (Parameters.strFormat === 'HTML') {
                Ufoco.Functions.Content.funcClearHTMLForHTMLExport({ $ContentEditable: $ContentEditableClone });

                strDocContent = Ufoco.ElectronFramework.Fs.readFileSync(`${strDocThemePath}/template.html`, 'utf8');

                const strHighlightThemeCSS = Ufoco.ElectronFramework.Fs.readFileSync(`${strDocThemePath}/highlight.js-theme.min.css`, 'utf8');
                const strDocThemeCSS = Ufoco.ElectronFramework.Fs.readFileSync(`${strDocThemePath}/style.css`, 'utf8');

                const strDocThemeJS = Ufoco.ElectronFramework.Fs.readFileSync(`${strDocThemePath}/script.js`, 'utf8');

                // Lib
                strDocContent = strDocContent.replace('/* __normalizecss */', Ufoco.DocThemesLibraries.strNormalizeCSS);

                if ($ContentEditableClone.getElementsByTagName('pre').length) {
                    strDocContent = strDocContent.replace('/* __highlightthemecss */', strHighlightThemeCSS);
                    strDocContent = strDocContent.replace('/* __highlightjs */', Ufoco.DocThemesLibraries.strHighlightJS);
                } else {
                    strDocContent = strDocContent.replace('/* __highlightthemecss */', '');
                    strDocContent = strDocContent.replace('/* __highlightjs */', '');
                }

                if ($ContentEditableClone.getElementsByClassName('emoji').length) {
                    strDocContent = strDocContent.replace('/* __emojifycss */', Ufoco.DocThemesLibraries.strEmojisCSS);
                    strDocContent = strDocContent.replace('/* __emojifyjs */', Ufoco.DocThemesLibraries.strEmojisJS);
                } else {
                    strDocContent = strDocContent.replace('/* __emojifycss */', '');
                    strDocContent = strDocContent.replace('/* __emojifyjs */', '');
                }

                // Common code
                strDocContent = strDocContent.replace('/* __documentcss */', Ufoco.DocThemesLibraries.strDocumentCSS);
                strDocContent = strDocContent.replace('/* __documentjs */', Ufoco.DocThemesLibraries.strDocumentJS);

                // Doc theme code
                strDocContent = strDocContent.replace('/* __docthemecss */', strDocThemeCSS);
                strDocContent = strDocContent.replace('/* __docthemejs */', strDocThemeJS);

                // HTML content replace at the end, to avoid regexp false detection with previous strings
                strDocContent = strDocContent.replace('<!-- __documentcontent -->', $ContentEditableClone.innerHTML);
            } else if (Parameters.strFormat === 'Markdown') {
                Ufoco.Functions.Content.funcClearHTMLForMarkdownExport({ $ContentEditable: $ContentEditableClone });
                strDocContent = Ufoco.Functions.Utils.funcHTMLToMarkdown({ strContent: $ContentEditableClone.innerHTML });
            }

            Ufoco.ElectronFramework.Fs.writeFileSync(Parameters.strSavePath, strDocContent, 'utf8');

            return true;
        }
    });
};



// Parameters :
// - strPath
// - strFormat
Ufoco.Functions.IO.funcLoadDoc = (Parameters) => {
    // Return whatever funcToTry returns
    return Ufoco.Functions.IO.funcIOErrorCheck({
        funcToTry: () => {
            let strDocContent = Ufoco.ElectronFramework.Fs.readFileSync(Parameters.strPath, 'utf8');

            if (Parameters.strFormat === 'HTML') {
                return {
                    strLoadedDocThemeSlug: strDocContent.match('- __themeslug: (.*) -')[1],
                    strLoadedDocThemeName: strDocContent.match('- __themename: (.*) -')[1],
                    // RegExp -> [\s\S] any characters, even line breaks
                    strLoadedContent: strDocContent.match(/<main>([\s\S]*)<\/main>/)[1]
                };
            } else if (Parameters.strFormat === 'Markdown') {
                return {
                    strLoadedContent: Ufoco.Functions.Utils.funcMarkdownToHTML({ strContent: strDocContent })
                };
            }
        }
    });
};