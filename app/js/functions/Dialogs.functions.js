Ufoco.Functions.Dialogs = {};


Ufoco.Functions.Dialogs.funcShow = (parameter) => {
    if (Ufoco.strActiveDialogKey === 'search') {
        Ufoco.Functions.Content.funcCleanSearch({ Document: Ufoco.activeDoc });
    }

    document.body.dataset.dialog = parameter.strDialogSlug;
    Ufoco.strActiveDialogKey = parameter.strDialogSlug;

    if (Ufoco.strActiveDialogKey) {
        Ufoco.$activeDialogElt = document.getElementById(`${Ufoco.strActiveDialogKey}-dialog`);
    } else {
        Ufoco.$activeDialogElt = null;
    }

    Ufoco.$toolbarElt.classList.remove('active');
};


Ufoco.Functions.Dialogs.funcValidateCurrent = () => {
    if (Ufoco.strActiveDialogKey) {
        const $RaisedButton = Ufoco.$activeDialogElt.getElementsByClassName('mdl-button--raised')[0];
        if ($RaisedButton) {
            $RaisedButton.click();
        }
    }
};


Ufoco.Functions.Dialogs.funcCloseCurrent = () => {
    if (Ufoco.strActiveDialogKey) {
        // In every dialog, there is at least one .close-dialog-button
        Ufoco.$activeDialogElt.getElementsByClassName('close-dialog-button')[0].click();
    }
};


Ufoco.Functions.Dialogs.funcForceClose = () => {
    Ufoco.Functions.Dialogs.funcShow({ strDialogSlug: '' });
};


Ufoco.Functions.Dialogs.funcCloseContext = () => {
    if (
        Ufoco.strActiveDialogKey &&
        Ufoco.strActiveDialogKey !== 'table-content' &&
        Ufoco.strActiveDialogKey !== 'doc-info' &&
        Ufoco.strActiveDialogKey !== 'unsaved-docs' &&
        Ufoco.strActiveDialogKey !== 'new-update' &&
        Ufoco.strActiveDialogKey !== 'priority-info' &&
        Ufoco.strActiveDialogKey !== 'io-error'
    ) {
        Ufoco.Functions.Dialogs.funcCloseCurrent();
    }
};



Ufoco.Functions.Dialogs.funcUpdateTableContent = () => {
    Ufoco.$headingsListElt.innerHTML = '';
    const arrDocHeadings = Ufoco.activeDoc.$ContentEditable.querySelectorAll('h1, h2, h3, h4, h5, h6');

    if (arrDocHeadings.length) {
        Ufoco.Functions.Content.funcSetHeadingsIDs({ Document: Ufoco.activeDoc });

        forEach(arrDocHeadings, ($H) => {
            const intHeadingLevel = parseInt($H.tagName.slice(-1));
            let strHeadingLevel = '';
            switch (intHeadingLevel) {
                case 1:
                    strHeadingLevel = 'XL';
                    break;
                case 2:
                    strHeadingLevel = 'L';
                    break;
                case 3:
                    strHeadingLevel = 'M';
                    break;
                case 4:
                    strHeadingLevel = 'S';
                    break;
                case 5:
                    strHeadingLevel = 'XS';
                    break;
                case 6:
                    strHeadingLevel = 'XXS';
                    break;
            }

            const $HeadingItem = Ufoco.$tableContentHeadingModelElt.cloneNode(true);
            $HeadingItem.getElementsByClassName('mdl-list__item-primary-content')[0].textContent = $H.textContent;
            $HeadingItem.getElementsByClassName('mdl-list__item-secondary-action')[0].textContent = strHeadingLevel;
            $HeadingItem.dataset.anchor = '#' + $H.id;


            $HeadingItem.addEventListener('click', () => {
                const $Anchor = document.querySelector($HeadingItem.dataset.anchor);
                if ($Anchor) {
                    zenscroll.createScroller(Ufoco.activeDoc.$ContentContainer).center($Anchor);
                }
            });

            Ufoco.$headingsListElt.appendChild($HeadingItem);
        });

        Ufoco.$tableContentDialogElt.dataset.view = 'headings-list';
    } else {
        Ufoco.$tableContentDialogElt.dataset.view = 'no-headings';
    }
};



Ufoco.Functions.Dialogs.funcUpdateDocInfo = () => {
    if (Ufoco.activeDoc.strDocThemeName) {
        Ufoco.$docInfoThemeNameElt.textContent = Ufoco.activeDoc.strDocThemeName;
    } else {
        Ufoco.$docInfoThemeNameElt.textContent = '—';
    }

    Countable.once(Ufoco.activeDoc.$ContentEditable, (Counter) => {
        Ufoco.$docInfoParagraphsElt.textContent = Counter.paragraphs;
        Ufoco.$docInfoSentencesElt.textContent = Counter.sentences;
        Ufoco.$docInfoWordsElt.textContent = Counter.words;
        Ufoco.$docInfoCharactersElt.textContent = Counter.characters;
        Ufoco.$docInfoCharactersSpacesElt.textContent = Counter.all;
    });
};