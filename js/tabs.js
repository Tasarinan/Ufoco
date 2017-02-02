(() => {

    let timerHeaderVisible;
    const funcShowHeader = (parameter) => {
        Ufoco.$headerElt.classList.add('active');

        clearTimeout(timerHeaderVisible);
        timerHeaderVisible = setTimeout(() => {
            Ufoco.$headerElt.classList.remove('active');
            clearTimeout(timerHeaderVisible);
        }, parameter.flDelay);
    };



    document.getElementById('menu-new-doc').addEventListener('click', () => {
        new Document();
    });
    Ufoco.$tabsListElt.addEventListener('dblclick', () => {
        new Document();
    });
    Ufoco.$headerElt.getElementsByClassName('add-tab-button')[0].addEventListener('click', () => {
        new Document();
    });
    // bind() doesn't work in any text fields. An official plugin 'global bind' allows that.
    Mousetrap.bindGlobal(['mod+n', 'mod+t'], () => {
        new Document();
    });

    Ufoco.$tabsListElt.addEventListener('mousewheel', (Event) => {
        Ufoco.$tabsListElt.scrollLeft -= Event.wheelDelta;
    });



    document.getElementById('menu-open-doc').addEventListener('click', () => {
        Ufoco.Functions.Documents.funcOpenDialog();
    });
    Mousetrap.bindGlobal('mod+o', () => {
        Ufoco.Functions.Documents.funcOpenDialog();
    });


    Mousetrap.bindGlobal('mod+w', () => {
        Ufoco.activeDoc.methClose();
    });


    document.getElementById('menu-close-all-docs').addEventListener('click', () => {
        Ufoco.Functions.Documents.funcCloseAll();
    });
    Mousetrap.bindGlobal('mod+shift+w', () => {
        Ufoco.Functions.Documents.funcCloseAll();
    });



    Mousetrap.bindGlobal('ctrl+tab', () => {
        funcShowHeader({ flDelay: 2000 });

        // Click on the concerned tab only if there are more than 1 tab opened
        if (Ufoco.intCurrentDocs > 1) {
            let $NextTab = Ufoco.activeDoc.$Tab.nextElementSibling;
            if (!$NextTab) {
                $NextTab = Ufoco.$tabsListElt.firstElementChild;
            }
            Ufoco.$tabsListElt.scrollLeft = $NextTab.offsetLeft - 120;
            $NextTab.click();
        }
    });

    Mousetrap.bindGlobal('ctrl+shift+tab', () => {
        funcShowHeader({ flDelay: 2000 });

        // Click on the concerned tab only if there are more than 1 tab opened
        if (Ufoco.intCurrentDocs > 1) {
            let $PreviousTab = Ufoco.activeDoc.$Tab.previousElementSibling;
            if (!$PreviousTab) {
                // Warning : Ufoco.$tabsListElt must contain ONLY usable tabs, otherwise the script won't work.
                $PreviousTab = Ufoco.$tabsListElt.lastElementChild;
            }
            Ufoco.$tabsListElt.scrollLeft = $PreviousTab.offsetLeft - Ufoco.$tabsListElt.offsetWidth + $PreviousTab.offsetWidth + 120;
            $PreviousTab.click();
        }
    });



    Ufoco.$unsavedDocsDialogElt.getElementsByClassName('force-close-all')[0].addEventListener('click', () => {
        Ufoco.Functions.Documents.funcCloseAll({ boolForceAction: true });
    });
    Ufoco.$unsavedDocsDialogElt.getElementsByClassName('cancel-all')[0].addEventListener('click', () => {
        forEach(Ufoco.$tabsListElt.getElementsByClassName('tab'), ($Tab) => {
            $Tab.classList.remove('close-confirm');
        });
    });



    Sortable.create(Ufoco.$tabsListElt, {
        delay: 10,
        animation: 150
    });



    new Document();

})();