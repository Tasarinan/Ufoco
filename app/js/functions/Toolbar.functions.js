Ufoco.Functions.Toolbar = {};


Ufoco.Functions.Toolbar.funcAutoPosition = () => {
    const Range = lightrange.getSelectionInfo();
    const intToolsWidth = Ufoco.$toolbarElt.offsetWidth;

    let intToolsTop = Range.yStart - Ufoco.$toolbarElt.offsetHeight - 4;
    // 38px : .tab-bar height
    if (intToolsTop < 38) {
        intToolsTop = Range.yStart + Range.height + 5;
    }
    Ufoco.$toolbarElt.style.top = intToolsTop + 'px';


    let intToolsLeft = Range.xStart + (Range.width / 2 - intToolsWidth / 2);
    if (intToolsLeft < 7) {
        intToolsLeft = 7;
    } else {
        const intWindowRightLimit = window.innerWidth - 12;
        if (intToolsLeft + intToolsWidth > intWindowRightLimit) {
            intToolsLeft = intWindowRightLimit - intToolsWidth;
        }
    }
    Ufoco.$toolbarElt.style.left = intToolsLeft + 'px';


    // To know if the selection is a range or a caret, for displaying the toolbar or not
    return Range;
};


Ufoco.Functions.Toolbar.funcResetPosition = () => {
    Ufoco.$toolbarElt.style.top = '134px';
    Ufoco.$toolbarElt.style.left = '7px';
};


Ufoco.Functions.Toolbar.funcView = () => {
    Ufoco.$toolbarElt.dataset.view = 'tools-list';

    if (Ufoco.Functions.Toolbar.funcAutoPosition().characters) {
        Ufoco.$toolbarElt.classList.add('active');
    } else {
        Ufoco.$toolbarElt.classList.remove('active');
    }
};


Ufoco.Functions.Toolbar.funcResetView = () => {
    lightrange.restoreSelection(Ufoco.activeDoc.LastSelection);
    Ufoco.$toolbarElt.dataset.view = 'tools-list';
    Ufoco.Functions.Toolbar.funcAutoPosition();
};


Ufoco.Functions.Toolbar.funcCheckTools = () => {
    forEach(Ufoco.$toolbarElt.getElementsByTagName('li'), ($Button) => {
        if ($Button.dataset.cmd) {
            if ($Button.dataset.cmdcheck) {
                if (document.queryCommandState($Button.dataset.cmdcheck)) {
                    $Button.classList.add('active');
                } else {
                    $Button.classList.remove('active');
                }
            } else {
                if (document.queryCommandState($Button.dataset.cmd)) {
                    $Button.classList.add('active');
                } else {
                    $Button.classList.remove('active');
                }
            }
        } else if ($Button.dataset.tag) {
            if (document.queryCommandValue('formatBlock') === $Button.dataset.tag) {
                $Button.classList.add('active');
            } else {
                $Button.classList.remove('active');
            }
        }
    });

    if (Ufoco.$toolQuoteElt.classList.contains('active') || Ufoco.$toolH1Elt.classList.contains('active') || Ufoco.$toolH2Elt.classList.contains('active') || Ufoco.$toolH3Elt.classList.contains('active') || Ufoco.$toolH4Elt.classList.contains('active') || Ufoco.$toolH5Elt.classList.contains('active') || Ufoco.$toolH6Elt.classList.contains('active')) {
        Ufoco.$toolUnorderedListElt.classList.add('disabled');
        Ufoco.$toolOrderedListElt.classList.add('disabled');
    } else {
        Ufoco.$toolUnorderedListElt.classList.remove('disabled');
        Ufoco.$toolOrderedListElt.classList.remove('disabled');
    }

    if (Ufoco.$toolUnorderedListElt.classList.contains('active') || Ufoco.$toolOrderedListElt.classList.contains('active')) {
        Ufoco.$toolQuoteElt.classList.add('disabled');
        Ufoco.$toolH1Elt.classList.add('disabled');
        Ufoco.$toolH2Elt.classList.add('disabled');
        Ufoco.$toolH3Elt.classList.add('disabled');
        Ufoco.$toolH4Elt.classList.add('disabled');
        Ufoco.$toolH5Elt.classList.add('disabled');
        Ufoco.$toolH6Elt.classList.add('disabled');
    } else {
        Ufoco.$toolQuoteElt.classList.remove('disabled');
        Ufoco.$toolH1Elt.classList.remove('disabled');
        Ufoco.$toolH2Elt.classList.remove('disabled');
        Ufoco.$toolH3Elt.classList.remove('disabled');
        Ufoco.$toolH4Elt.classList.remove('disabled');
        Ufoco.$toolH5Elt.classList.remove('disabled');
        Ufoco.$toolH6Elt.classList.remove('disabled');
    }
};