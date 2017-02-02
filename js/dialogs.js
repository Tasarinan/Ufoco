(() => {

    forEach(document.getElementsByClassName('close-dialog-button'), ($Button) => {
        $Button.addEventListener('click', () => {
            Ufoco.Functions.Dialogs.funcForceClose();
        });
    });



    Ufoco.$menuOpenDocFolderElt.addEventListener('click', () => {
        Ufoco.activeDoc.methOpenFolder();
    });
    Mousetrap.bindGlobal('mod+shift+o', () => {
        Ufoco.$menuOpenDocFolderElt.click();
    });


    document.getElementById('menu-save-as').addEventListener('click', () => {
        Ufoco.Functions.Dialogs.funcShow({ strDialogSlug: 'save-as' });
    });
    Mousetrap.bindGlobal('mod+shift+s', () => {
        Ufoco.Functions.Dialogs.funcShow({ strDialogSlug: 'save-as' });
    });


    document.getElementById('menu-search').addEventListener('click', () => {
        Ufoco.Functions.Dialogs.funcShow({ strDialogSlug: 'search' });
        Ufoco.$searchInputElt.select();
    });
    Mousetrap.bindGlobal('mod+f', () => {
        Ufoco.Functions.Dialogs.funcShow({ strDialogSlug: 'search' });
        Ufoco.$searchInputElt.select();
    });


    document.getElementById('menu-table-content').addEventListener('click', () => {
        Ufoco.Functions.Dialogs.funcShow({ strDialogSlug: 'table-content' });
        Ufoco.Functions.Dialogs.funcUpdateTableContent();
    });
    Ufoco.$tableContentDialogElt.getElementsByClassName('refresh-button')[0].addEventListener('click', () => {
        Ufoco.Functions.Dialogs.funcUpdateTableContent();
    });


    document.getElementById('menu-doc-info').addEventListener('click', () => {
        Ufoco.Functions.Dialogs.funcShow({ strDialogSlug: 'doc-info' });
        Ufoco.Functions.Dialogs.funcUpdateDocInfo();
    });
    Ufoco.$docInfoDialogElt.getElementsByClassName('recount-button')[0].addEventListener('click', () => {
        Ufoco.Functions.Dialogs.funcUpdateDocInfo();
    });

    document.getElementById('menu-print').addEventListener('click', () => {
        Ufoco.Functions.Dialogs.funcShow({ strDialogSlug: 'print' });
    });
    Mousetrap.bindGlobal('mod+p', () => {
        Ufoco.Functions.Dialogs.funcShow({ strDialogSlug: 'print' });
    });


    document.getElementById('menu-settings').addEventListener('click', () => {
        Ufoco.Functions.Dialogs.funcShow({ strDialogSlug: 'settings' });
    });


    document.getElementById('menu-shortcuts').addEventListener('click', () => {
        Ufoco.Functions.Dialogs.funcShow({ strDialogSlug: 'shortcuts' });
    });
    Mousetrap.bindGlobal('ctrl+space', () => {
        Ufoco.Functions.Dialogs.funcShow({ strDialogSlug: 'shortcuts' });
    });


    Ufoco.$menuQuickGuideElt.addEventListener('click', () => {
        Ufoco.Functions.Documents.funcOpen({ arrPaths: [`${Ufoco.strAppPath}/documents/quick-guide-${Ufoco.Settings.strUILangSlug}.html`] });
    });


    document.getElementById('menu-about').addEventListener('click', () => {
        Ufoco.Functions.Dialogs.funcShow({ strDialogSlug: 'about' });
    });
    Ufoco.$aboutDialogElt.getElementsByClassName('app-folder-button')[0].addEventListener('click', () => {
        Ufoco.ElectronFramework.Shell.showItemInFolder(Ufoco.strAppExePath);
    });



    Mousetrap.bindGlobal('escape', () => {
        if (Ufoco.$toolbarElt.dataset.view === 'tools-list') {
            Ufoco.$toolbarElt.classList.remove('active');
        }

        Ufoco.$contextMenuElt.classList.remove('active');

        Ufoco.Functions.Dialogs.funcCloseCurrent();
    });


    Mousetrap.bindGlobal('enter', () => {
        Ufoco.Functions.Dialogs.funcValidateCurrent();
    });




    Ufoco.$unsavedDocsDialogElt.getElementsByClassName('quit-app')[0].addEventListener('click', () => {
        document.body.classList.add('force-close-app');
        Ufoco.Functions.Window.funcClose();
    });


    window.addEventListener('beforeunload', (Event) => {
        if (!document.body.classList.contains('force-close-app')) {
            const AfterCloseStatus = Ufoco.Functions.Documents.funcCloseAll();

            // Prevent the window from closing if there are unsaved documents
            if (AfterCloseStatus.boolUnsavedDocs) {
                Event.returnValue = false;
            }
        }
    });

})();