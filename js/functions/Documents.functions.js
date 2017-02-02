Ufoco.Functions.Documents = {};


Ufoco.Functions.Documents.funcDocActiveChange = () => {
    if (Ufoco.activeDoc) {
        Ufoco.activeDoc.LastSelection = lightrange.saveSelection();
        Ufoco.activeDoc.$Tab.classList.remove('active');
        Ufoco.activeDoc.$ContentContainer.classList.remove('active');

        Ufoco.Functions.Content.funcCleanSearch({ Document: Ufoco.activeDoc });
    }
};


Ufoco.Functions.Documents.funcOpenDialog = () => {
    Ufoco.Functions.Dialogs.funcCloseContext();

    Ufoco.ElectronFramework.Dialog.showOpenDialog({
        properties: [
            'openFile',
            'multiSelections',
            'createDirectory'
        ],
        filters: [
            { name: 'Supported documents', extensions: ['html', 'htm', 'md', 'markdown'] },
            { name: 'HTML documents', extensions: ['html', 'htm'] },
            { name: 'Markdown documents', extensions: ['md', 'markdown'] }
        ]
    }, (arrPaths) => {
        // arrPaths is undefined if the opening is cancelled by the user
        if (arrPaths) {
            Ufoco.Functions.Documents.funcOpen({ arrPaths: arrPaths });
        }
    });
};



Ufoco.Functions.Documents.funcOpen = (Parameter) => {

    forEach(Parameter.arrPaths, (strPath) => {
        strPath = Ufoco.ElectronFramework.Path.normalize(strPath);

        let boolIsDocAlreadyOpened = false;

        // Check the current path with all opened document
        forEach(Ufoco.arrDocs, (Doc) => {
            // If the document is saved on disk (has a path) and has the same path (already opened)
            if (Doc && Doc.strPath && Doc.strPath === strPath) {
                // We mark it for the next step
                boolIsDocAlreadyOpened = true;
                if (Parameter.arrPaths.length === 1) {
                    Doc.methShow();
                }
                // Break the loop, it's useless to continue
                return;
            }
        });

        // After looping into all the saved and opened documents, the document is not already opened, so we open it
        if (!boolIsDocAlreadyOpened) {
            const FilePathInfo = Ufoco.Functions.Utils.funcGetFilePathInfo({ strPath: strPath });

            let LoadedFile = Ufoco.Functions.IO.funcLoadDoc({ strPath: strPath, strFormat: FilePathInfo.strFormat });

            if (LoadedFile) {
                let strDocThemeSlug;
                let strDocThemeName;
                if (FilePathInfo.strFormat === 'HTML') {
                    strDocThemeSlug = LoadedFile.strLoadedDocThemeSlug;
                    strDocThemeName = LoadedFile.strLoadedDocThemeName;
                }

                let boolLockedDoc = false;
                if (FilePathInfo.strDirPath === Ufoco.ElectronFramework.Path.normalize(`${Ufoco.strAppPath}/documents`)) {
                    boolLockedDoc = true;
                }

                new Document({
                    strPath: strPath,
                    strContent: LoadedFile.strLoadedContent,
                    strDocThemeSlug: strDocThemeSlug,
                    strDocThemeName: strDocThemeName,
                    boolLockedDoc: boolLockedDoc
                });

                // Close the previous empty tab if there is only two tabs
                if (Ufoco.intCurrentDocs === 2) {
                    const $PreviousTab = Ufoco.activeDoc.$Tab.previousElementSibling;
                    if (!$PreviousTab.classList.contains('doc-unsaved') && !$PreviousTab.classList.contains('opened-doc')) {
                        $PreviousTab.getElementsByClassName('close-tab')[0].click();
                    }
                }
            }
        }
    });

};


// Option :
// - boolForceAction
Ufoco.Functions.Documents.funcCloseAll = (Option) => {
    forEach(Ufoco.arrDocs, (Doc) => {
        if (Doc) {
            if (Option && Option.boolForceAction) {
                Doc.methClose({ boolForceAction: true });
            } else {
                Doc.methClose();
            }
        }
    });

    if (Ufoco.$tabsListElt.getElementsByClassName('doc-unsaved').length) {
        Ufoco.Functions.Dialogs.funcShow({ strDialogSlug: 'unsaved-docs' });
        // returning a status to show a warning dialog at application closing
        return { boolUnsavedDocs: true };
    }

    return { boolUnsavedDocs: false };
};



Ufoco.Functions.Documents.funcMenuAvailabilityCheck = () => {
    if (Ufoco.activeDoc.strPath) {
        Ufoco.$menuOpenDocFolderElt.classList.remove('disabled');

        if (Ufoco.activeDoc.$Tab.classList.contains('doc-unsaved')) {
            Ufoco.$menuSaveElt.classList.remove('disabled');
        } else {
            Ufoco.$menuSaveElt.classList.add('disabled');
        }
    } else {
        Ufoco.$menuOpenDocFolderElt.classList.add('disabled');
        Ufoco.$menuSaveElt.classList.add('disabled');
    }

    if (Ufoco.activeDoc.boolLocked) {
        Ufoco.$menuSaveElt.classList.add('disabled');
    }
};