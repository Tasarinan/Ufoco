// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes
class Document {

    // Add a document and the corresponding content (empty or not).
    // Options :
    // - strPath (optional)
    // - strContent (optional)
    // - strDocThemeSlug (optional)
    // - strDocThemeName (optional)
    // - boolLockedDoc (optional)
    constructor(Options) {
        const thisDoc = this;

        Ufoco.intDocIDsCount++;
        thisDoc.intID = Ufoco.intDocIDsCount;

        thisDoc.$Tab = Ufoco.$tabElt.cloneNode(true);
        thisDoc.$ContentContainer = Ufoco.$contentContainerModelElt.cloneNode(true);
        thisDoc.$ContentEditable = thisDoc.$ContentContainer.getElementsByClassName('wysiwyg-content')[0];
        thisDoc.$FileName = thisDoc.$Tab.getElementsByClassName('file-name')[0];

        thisDoc.boolLocked = false;

        if (Options) {
            thisDoc.methSetTabData(Options);

            thisDoc.$ContentEditable.innerHTML = Ufoco.Functions.Content.funcPurifyHTML({
                strHTML: Options.strContent,
                strAllowedContentMode: 'document'
            });
            Ufoco.Functions.Content.funcClearHTML({ Document: thisDoc });
            Ufoco.Functions.Content.funcSetHeadingsIDs({ Document: thisDoc });
            Ufoco.Functions.Content.funcDisplayEmojis({ Document: thisDoc });

            if (Options.boolLockedDoc) {
                thisDoc.boolLocked = true;
            }
        } else {
            thisDoc.$FileName.textContent += Ufoco.intDocIDsCount + 1;
        }

        thisDoc.$Tab.dataset.id = thisDoc.intID;

        thisDoc.LastSelection;

        thisDoc.strLastSavedContent = thisDoc.$ContentEditable.innerHTML;



        thisDoc.$Tab.getElementsByClassName('close-tab')[0].addEventListener('click', (Event) => {
            thisDoc.methClose();

            // To avoid triggering thisDoc.methShow() because the button is a child of the tab.
            Event.stopPropagation();
        });


        thisDoc.$Tab.getElementsByClassName('close-tab-cancel')[0].addEventListener('click', (Event) => {
            thisDoc.$Tab.classList.remove('close-confirm');

            // To avoid triggering thisDoc.methShow() because the button is a child of the tab.
            Event.stopPropagation();
        });
        thisDoc.$Tab.getElementsByClassName('close-tab-confirm')[0].addEventListener('click', (Event) => {
            thisDoc.methClose({ boolForceAction: true });

            // To avoid triggering thisDoc.methShow() because the button is a child of the tab.
            Event.stopPropagation();
        });


        thisDoc.$Tab.addEventListener('click', (Event) => {
            if (Event.button === 0) {
                thisDoc.methShow();
            } else if (Event.button === 1) {
                thisDoc.methClose();

                // FIXME [(Un)colored] : On Windows, cancel the default middle mouse click page navigation system. Event.preventDefault() not working.
            }
        });


        // To avoid triggering the 'dblclick' of Ufoco.$TabsList.
        thisDoc.$Tab.addEventListener('dblclick', (Event) => {
            Event.stopPropagation();
        });


        thisDoc.$ContentContainer.addEventListener('scroll', () => {
            Ufoco.Functions.Toolbar.funcAutoPosition();
        });



        thisDoc.Editor = wysiwyg({
            element: thisDoc.$ContentEditable
        });

        thisDoc.$ContentEditable.addEventListener('click', () => {
            thisDoc.LastSelection = lightrange.saveSelection();
            Ufoco.Functions.Toolbar.funcView();
            Ufoco.Functions.Toolbar.funcAutoPosition();
            Ufoco.Functions.Toolbar.funcCheckTools();
            // Because of the context menu on a tab
            Ufoco.$headerElt.classList.remove('active');
        });

        thisDoc.$ContentEditable.addEventListener('keydown', (Event) => {
            thisDoc.LastSelection = lightrange.saveSelection();
            Ufoco.Functions.Toolbar.funcView();
            Ufoco.Functions.Toolbar.funcAutoPosition();
            Ufoco.Functions.Toolbar.funcCheckTools();

            // Space key
            if (Event.keyCode === 32) {
                Ufoco.Functions.Content.funcDisplayEmojis({ Document: thisDoc });
            } else if (Event.altKey) {
                Ufoco.$toolbarElt.classList.add('active');
            }

            Ufoco.Functions.Documents.funcMenuAvailabilityCheck();
        });

        thisDoc.$ContentEditable.addEventListener('input', () => {
            if (!thisDoc.$ContentEditable.innerHTML) {
                thisDoc.$ContentEditable.innerHTML = '<p><br></p>';
            }

            clearTimeout(Ufoco.timerInput);
            Ufoco.timerInput = setTimeout(() => {
                Ufoco.Functions.Content.funcClearHTML({ Document: thisDoc });

                if (thisDoc.$ContentEditable.innerHTML === thisDoc.strLastSavedContent) {
                    Ufoco.$globalUnsavedMarkElt.classList.remove('active');
                    thisDoc.$Tab.classList.remove('doc-unsaved');
                } else {
                    Ufoco.$globalUnsavedMarkElt.classList.add('active');
                    thisDoc.$Tab.classList.add('doc-unsaved');
                }

                // keydown is not triggered with some command like 'undo', so we have to check here as well
                Ufoco.Functions.Documents.funcMenuAvailabilityCheck();

                clearTimeout(Ufoco.timerInput);
            }, 400);
        });

        thisDoc.$ContentEditable.addEventListener('copy', () => {
            clearTimeout(Ufoco.timerClipboard);
            Ufoco.timerClipboard = setTimeout(() => {
                Ufoco.strLastHTMLCopied = Ufoco.ElectronFramework.Clipboard.readHTML();
                clearTimeout(Ufoco.timerClipboard);
            }, 30);
        });
        thisDoc.$ContentEditable.addEventListener('cut', () => {
            clearTimeout(Ufoco.timerClipboard);
            Ufoco.timerClipboard = setTimeout(() => {
                Ufoco.strLastHTMLCopied = Ufoco.ElectronFramework.Clipboard.readHTML();
                clearTimeout(Ufoco.timerClipboard);
            }, 30);
        });

        thisDoc.$ContentEditable.addEventListener('paste', () => {
            let strClipboardHTML = Ufoco.ElectronFramework.Clipboard.readHTML();

            if (strClipboardHTML !== Ufoco.strLastHTMLCopied && strClipboardHTML !== Ufoco.strLastHTMLPasted) {
                strClipboardHTML = Ufoco.Functions.Content.funcPurifyHTML({
                    strHTML: strClipboardHTML,
                    strAllowedContentMode: 'paste'
                });

                Ufoco.ElectronFramework.Clipboard.writeHTML(strClipboardHTML);
                Ufoco.strLastHTMLPasted = strClipboardHTML;
            }
            // Set capture mode to "true" to execute paste instructions before the content is actually pasted.
            // http://stackoverflow.com/questions/7398290/unable-to-understand-usecapture-attribute-in-addeventlistener/7398447#7398447
        }, true);


        thisDoc.$ContentEditable.addEventListener('paste', () => {
            clearTimeout(Ufoco.timerClipboard);
            Ufoco.timerClipboard = setTimeout(() => {
                Ufoco.Functions.Content.funcClearHTML({ Document: thisDoc });
                Ufoco.Functions.Content.funcSetHeadingsIDs({ Document: thisDoc });
                Ufoco.Functions.Content.funcDisplayEmojis({ Document: thisDoc });
                clearTimeout(Ufoco.timerClipboard);
            }, 50);
        });


        thisDoc.$ContentEditable.addEventListener('dragstart', (Event) => {
            Ufoco.strLastHTMLDragged = Event.target;
        });

        thisDoc.$ContentEditable.addEventListener('drag', (Event) => {
            if (Event.target === Ufoco.strLastHTMLDragged) {
                Ufoco.boolCanDrop = true;
            } else {
                Event.preventDefault();
                return false;
            }
        });

        thisDoc.$ContentEditable.addEventListener('dragover', (Event) => {
            if (!Ufoco.boolCanDrop) {
                Event.preventDefault();
                return false;
            }
        });

        thisDoc.$ContentEditable.addEventListener('drop', (Event) => {
            if (!Ufoco.boolCanDrop) {
                Event.preventDefault();
                return false;
            }
            // Ufoco.boolCanDrop always "false" by default
            Ufoco.boolCanDrop = false;
        });


        Ufoco.$tabsListElt.appendChild(thisDoc.$Tab);
        Ufoco.$workspaceElt.appendChild(thisDoc.$ContentContainer);

        Ufoco.arrDocs.push(thisDoc);
        Ufoco.intCurrentDocs++;

        thisDoc.methShow();
        Ufoco.Functions.Toolbar.funcResetPosition();

        Ufoco.$tabsListElt.scrollLeft = Ufoco.$tabsListElt.scrollWidth;
    }


    methSetTabData(Parameter) {
        const thisDoc = this;

        thisDoc.FilePathInfo = Ufoco.Functions.Utils.funcGetFilePathInfo({ strPath: Parameter.strPath });

        thisDoc.strPath = Parameter.strPath;
        thisDoc.strFormat = thisDoc.FilePathInfo.strFormat;

        if (Parameter.strDocThemeSlug) {
            thisDoc.strDocThemeSlug = Parameter.strDocThemeSlug;
            thisDoc.strDocThemeName = Parameter.strDocThemeName;
        }

        thisDoc.$FileName.textContent = thisDoc.FilePathInfo.strName;
        thisDoc.$Tab.classList.add('opened-doc');
    }


    methShow() {
        const thisDoc = this;

        Ufoco.Functions.Documents.funcDocActiveChange();

        thisDoc.$Tab.classList.add('active');
        thisDoc.$ContentContainer.classList.add('active');

        if (thisDoc.$Tab.classList.contains('doc-unsaved')) {
            Ufoco.$globalUnsavedMarkElt.classList.add('active');
        } else {
            Ufoco.$globalUnsavedMarkElt.classList.remove('active');
        }

        Ufoco.activeDoc = thisDoc;

        if (thisDoc.LastSelection) {
            lightrange.restoreSelection(thisDoc.LastSelection);
        } else {
            thisDoc.$ContentEditable.focus();
        }
        Ufoco.Functions.Toolbar.funcView();

        Ufoco.Functions.Dialogs.funcCloseContext();
        Ufoco.Functions.Documents.funcMenuAvailabilityCheck();

        Ufoco.Functions.Dialogs.funcUpdateTableContent();
        Ufoco.Functions.Dialogs.funcUpdateDocInfo();
    }


    // Option :
    // - boolForceAction (optional)
    methClose(Option) {
        const thisDoc = this;

        // if boolForceAction : close the tab without warning.
        if (Option && Option.boolForceAction) {

            Ufoco.arrDocs[thisDoc.intID] = undefined;
            Ufoco.intCurrentDocs--;

            if (thisDoc === Ufoco.activeDoc) {
                const $PreviousTab = thisDoc.$Tab.previousElementSibling;
                if ($PreviousTab) {
                    $PreviousTab.click();
                } else {
                    const $NextTab = thisDoc.$Tab.nextElementSibling;
                    if ($NextTab) {
                        $NextTab.click();
                    }
                }
            }

            thisDoc.$Tab.parentNode.removeChild(thisDoc.$Tab);
            thisDoc.$ContentContainer.parentNode.removeChild(thisDoc.$ContentContainer);

            // There is always at least 1 tab opened.
            if (!Ufoco.intCurrentDocs) {
                new Document();
            }

        } else {

            if (thisDoc.$Tab.classList.contains('doc-unsaved')) {
                thisDoc.$Tab.classList.add('close-confirm');
            } else {
                thisDoc.methClose({ boolForceAction: true });
            }

        }

    }


    methOpenFolder() {
        const thisDoc = this;

        if (thisDoc.strPath) {
            Ufoco.ElectronFramework.Shell.showItemInFolder(thisDoc.strPath);
        }
    }

}