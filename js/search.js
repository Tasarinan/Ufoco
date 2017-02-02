(() => {

    const $SearchInputContainer = Ufoco.$searchInputElt.parentNode;
    const $ReplaceInputContainer = Ufoco.$replaceInputElt.parentNode;
    const $SwitchCaseSensitive = Ufoco.$searchDialogElt.querySelector('[for="switch-search-case-sensitive"]');

    let LastSearchRegExp;
    let Search = {};



    const funcMakeSearchRegExp = () => {
        let strRegExpFlags = 'g';
        if (!$SwitchCaseSensitive.classList.contains('is-checked')) {
            strRegExpFlags += 'i';
        }
        LastSearchRegExp = new RegExp(`(${Ufoco.Functions.Utils.funcEscapeStringRegexp({ strRegExp: Ufoco.$searchInputElt.value })})`, strRegExpFlags);
    };


    const funcFindAll = () => {
        Search = findAndReplaceDOMText(Ufoco.activeDoc.$ContentEditable, {
            find: LastSearchRegExp,

            replace: function(Portion, Match) {
                const $Searchresult = document.createElement('searchresult');
                $Searchresult.dataset.match = Match.index;
                $Searchresult.textContent = Portion.text;
                return $Searchresult;
            }
        });
    };


    const funcReplaceAll = () => {
        let strReplace = Ufoco.$replaceInputElt.value;
        if (!strReplace) {
            // findAndReplaceDOMText() doesn't accept empty value, but replace ' ' by an empty value
            strReplace = ' ';
        }

        findAndReplaceDOMText(Ufoco.activeDoc.$ContentEditable, {
            find: LastSearchRegExp,
            replace: strReplace
        });
    };


    const funcFindReplaceController = (Parameter) => {
        if (Ufoco.$searchInputElt.value) {
            $SearchInputContainer.classList.remove('is-invalid');

            if (Parameter.strMode === 'find-all') {
                Ufoco.Functions.Content.funcCleanSearch({ Document: Ufoco.activeDoc });
                funcMakeSearchRegExp();
                funcFindAll();
                Ufoco.$searchResultsTotalElt.textContent = Search.reverts.length;
            } else if (Parameter.strMode === 'replace-all') {
                Ufoco.Functions.Content.funcCleanSearch({ Document: Ufoco.activeDoc });
                funcMakeSearchRegExp();
                funcReplaceAll();

                Ufoco.Functions.Utils.funcTriggerEvent({
                    strEvent: 'input',
                    $Element: Ufoco.activeDoc.$ContentEditable
                });

                Ufoco.$searchResultsTotalElt.textContent = '0';
            }
        } else {
            $SearchInputContainer.classList.add('is-invalid');
        }
    };


    Ufoco.$searchDialogElt.getElementsByClassName('find-all-button')[0].addEventListener('click', () => {
        funcFindReplaceController({ strMode: 'find-all' });
    });
    Ufoco.$searchDialogElt.getElementsByClassName('replace-all-button')[0].addEventListener('click', () => {
        funcFindReplaceController({ strMode: 'replace-all' });
    });

})();