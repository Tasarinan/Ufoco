Ufoco.strAppName = 'UFOCO';
Ufoco.strAppVersion = Ufoco.ElectronFramework.App.getVersion();

Ufoco.strAppPath = Ufoco.ElectronFramework.App.getAppPath();
Ufoco.strAppExePath = Ufoco.ElectronFramework.App.getPath('exe');

Ufoco.strAppUserData = Ufoco.ElectronFramework.App.getPath('userData');
Ufoco.strSettingsFilePath = `${Ufoco.strAppUserData}/settings.min.json`;


Ufoco.Functions.IO.funcLoadSettings();
Ufoco.Functions.IO.funcLoadDocThemesLibs();


Ufoco.$headerElt = document.getElementsByClassName('mdl-layout__header')[0];
Ufoco.$windowControlsElt = document.getElementsByClassName('window-controls')[0];
Ufoco.$tabsListElt = document.getElementsByClassName('tabs-list')[0];
Ufoco.$tabElt = document.querySelector('#tab-model-container li');

Ufoco.$menuOpenDocFolderElt = document.getElementById('menu-open-doc-folder');
Ufoco.$menuSaveElt = document.getElementById('menu-save');
Ufoco.$menuQuickGuideElt = document.getElementById('menu-quick-guide');

Ufoco.$workspaceElt = document.getElementsByClassName('mdl-layout__content')[0];
Ufoco.$contentContainerModelElt = Ufoco.$workspaceElt.getElementsByClassName('content-container')[0];
Ufoco.$globalUnsavedMarkElt = document.getElementById('global-unsaved-mark');

Ufoco.$toolbarElt = document.getElementById('toolbar');
// Need to be here because of disabled tool state
Ufoco.$toolQuoteElt = document.getElementById('tool-quote');
Ufoco.$toolUnorderedListElt = document.getElementById('tool-unordered-list');
Ufoco.$toolOrderedListElt = document.getElementById('tool-ordered-list');
Ufoco.$toolH1Elt = document.getElementById('tool-h1');
Ufoco.$toolH2Elt = document.getElementById('tool-h2');
Ufoco.$toolH3Elt = document.getElementById('tool-h3');
Ufoco.$toolH4Elt = document.getElementById('tool-h4');
Ufoco.$toolH5Elt = document.getElementById('tool-h5');
Ufoco.$toolH6Elt = document.getElementById('tool-h6');

Ufoco.$contextMenuElt = document.getElementById('context-menu');

Ufoco.$searchDialogElt = document.getElementById('search-dialog');
Ufoco.$searchInputElt = document.getElementById('search-field');
Ufoco.$replaceInputElt = document.getElementById('replace-field');
Ufoco.$searchResultsTotalElt = Ufoco.$searchDialogElt.getElementsByClassName('search-results-total')[0];

Ufoco.$tableContentDialogElt = document.getElementById('table-content-dialog');
Ufoco.$headingsListElt = Ufoco.$tableContentDialogElt.getElementsByClassName('headings-list')[0];
Ufoco.$tableContentHeadingModelElt = document.querySelector('#heading-item-model-container li');

Ufoco.$docInfoDialogElt = document.getElementById('doc-info-dialog');
Ufoco.$docInfoThemeNameElt = Ufoco.$docInfoDialogElt.getElementsByClassName('doc-theme-name')[0];
Ufoco.$docInfoParagraphsElt = Ufoco.$docInfoDialogElt.getElementsByClassName('paragraphs-number')[0];
Ufoco.$docInfoSentencesElt = Ufoco.$docInfoDialogElt.getElementsByClassName('sentences-number')[0];
Ufoco.$docInfoWordsElt = Ufoco.$docInfoDialogElt.getElementsByClassName('words-number')[0];
Ufoco.$docInfoCharactersElt = Ufoco.$docInfoDialogElt.getElementsByClassName('characters-number')[0];
Ufoco.$docInfoCharactersSpacesElt = Ufoco.$docInfoDialogElt.getElementsByClassName('characters-spaces-number')[0];

Ufoco.$aboutDialogElt = document.getElementById('about-dialog');

Ufoco.$unsavedDocsDialogElt = document.getElementById('unsaved-docs-dialog');


Ufoco.arrDocs = [];
Ufoco.activeDoc;

Ufoco.intDocIDsCount = -1;
Ufoco.intCurrentDocs = 0;

Ufoco.strLastHTMLCopied = '';
Ufoco.strLastHTMLPasted = '';
Ufoco.strLastHTMLDragged = '';
Ufoco.timerInput;
Ufoco.timerClipboard;
// Ufoco.boolCanDrop always "false" by default
Ufoco.boolCanDrop = false;

Ufoco.LastContextMenuElementInfo;
Ufoco.RegExpHeading = new RegExp(/^h\d$/, 'i');

Ufoco.$activeDialogElt;
Ufoco.strActiveDialogKey = '';



Ufoco.Functions.Utils.funcSetDOMAppName();

Mousetrap.bindGlobal('tab', () => {
    if (document.activeElement !== Ufoco.$searchInputElt) {
        return false;
    }
});
Mousetrap.bindGlobal('shift+tab', () => {
    if (document.activeElement !== Ufoco.$replaceInputElt) {
        return false;
    }
});

emojify.setConfig({ mode: 'data-uri' });