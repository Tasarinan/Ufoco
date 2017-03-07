(() => {

    const $ToolParagraph = document.getElementById('tool-paragraph');
    const $ToolRemoteImage = document.getElementById('tool-remote-image');
    const $ToolRemoteVideo = document.getElementById('tool-remote-video');
    const $ToolRemoteEmbed = document.getElementById('tool-remote-embed');

    const $ToolBold = document.getElementById('tool-bold');
    const $ToolItalic = document.getElementById('tool-italic');
    const $ToolUnderline = document.getElementById('tool-underline');
    const $ToolStrike = document.getElementById('tool-strike');
    const $ToolApplyLink = document.getElementById('tool-apply-link');
    const $ToolSuperscript = document.getElementById('tool-superscript');
    const $ToolSubscript = document.getElementById('tool-subscript');
    const $ToolClear = document.getElementById('tool-clear');
    const $ToolEmojis = document.getElementById('tool-emojis');


    const $InputRemoteImage = Ufoco.$toolbarElt.querySelector('.remote-image-view input');
    const $CancelRemoteImage = Ufoco.$toolbarElt.querySelector('.remote-image-view .cancel-tool');
    const $ValidateRemoteImage = Ufoco.$toolbarElt.querySelector('.remote-image-view .validate-tool');

    const $InputRemoteVideo = Ufoco.$toolbarElt.querySelector('.remote-video-view input');
    const $CancelRemoteVideo = Ufoco.$toolbarElt.querySelector('.remote-video-view .cancel-tool');
    const $ValidateRemoteVideo = Ufoco.$toolbarElt.querySelector('.remote-video-view .validate-tool');

    const $InputRemoteEmbed = Ufoco.$toolbarElt.querySelector('.remote-embed-view input');
    const $CancelRemoteEmbed = Ufoco.$toolbarElt.querySelector('.remote-embed-view .cancel-tool');
    const $ValidateRemoteEmbed = Ufoco.$toolbarElt.querySelector('.remote-embed-view .validate-tool');

    const $InputApplyLink = Ufoco.$toolbarElt.querySelector('.apply-link-view input');
    const $CancelApplyLink = Ufoco.$toolbarElt.querySelector('.apply-link-view .cancel-tool');
    const $ValidateApplyLink = Ufoco.$toolbarElt.querySelector('.apply-link-view .validate-tool');

    const $InputEmojis = Ufoco.$toolbarElt.querySelector('.emojis-view input');
    const $CancelEmojis = Ufoco.$toolbarElt.querySelector('.emojis-view .cancel-tool');
    const $SearchEmojis = Ufoco.$toolbarElt.querySelector('.emojis-view .search-button');
    const $EmojisList = Ufoco.$toolbarElt.querySelector('.emojis-view .emojis-list');
    const Emojis = Ufoco.Functions.IO.funcLoadEmojis();



    const funcToolButtonsCompatibility = (Parameter) => {
        const $Button = Parameter.$ButtonClicked;
        let boolCanFormat = true;

        // Some tools incompatibilities with activated lists
        if (Ufoco.$toolUnorderedListElt.classList.contains('active') || Ufoco.$toolOrderedListElt.classList.contains('active')) {
            if (
                $Button === $ToolParagraph || $Button === Ufoco.$toolQuoteElt ||
                $Button === Ufoco.$toolH1Elt || $Button === Ufoco.$toolH2Elt || $Button === Ufoco.$toolH3Elt || $Button === Ufoco.$toolH4Elt || $Button === Ufoco.$toolH5Elt || $Button === Ufoco.$toolH6Elt
            ) {
                boolCanFormat = false;
            }
        }

        // List tools incompatibilities with some activated tools
        if ($Button === Ufoco.$toolUnorderedListElt || $Button === Ufoco.$toolOrderedListElt) {
            if (
                Ufoco.$toolQuoteElt.classList.contains('active') || Ufoco.$toolH1Elt.classList.contains('active') || Ufoco.$toolH2Elt.classList.contains('active') || Ufoco.$toolH3Elt.classList.contains('active') || Ufoco.$toolH4Elt.classList.contains('active') || Ufoco.$toolH5Elt.classList.contains('active') || Ufoco.$toolH6Elt.classList.contains('active')
            ) {
                boolCanFormat = false;
            }
        }

        return boolCanFormat;
    };



    Ufoco.$toolbarElt.addEventListener('mousedown', (Event) => {
        Event.preventDefault();
    });
    forEach(Ufoco.$toolbarElt.getElementsByTagName('input'), ($Input) => {
        $Input.addEventListener('mousedown', (Event) => {
            Event.stopPropagation();
        });
    });


    forEach(Ufoco.$toolbarElt.querySelectorAll('.tools-list-view li'), ($Button) => {
        $Button.addEventListener('click', () => {
            const boolCanFormat = funcToolButtonsCompatibility({ $ButtonClicked: $Button });

            if (boolCanFormat) {
                if ($Button.dataset.cmd) {
                    if ($Button.dataset.cmdparam) {
                        // http://stackoverflow.com/questions/1723287/calling-a-javascript-function-named-in-a-variable
                        Ufoco.activeDoc.Editor[$Button.dataset.cmd]($Button.dataset.cmdparam);
                    } else {
                        Ufoco.activeDoc.Editor[$Button.dataset.cmd]();
                    }
                } else if ($Button.dataset.tag) {
                    Ufoco.activeDoc.Editor.format($Button.dataset.tag);

                    // if it's a heading tool button
                    if (Ufoco.RegExpHeading.test($Button.dataset.tag)) {
                        Ufoco.Functions.Dialogs.funcUpdateTableContent();
                    }
                } else {
                    Ufoco.activeDoc.LastSelection = lightrange.saveSelection();
                    Ufoco.$toolbarElt.dataset.view = $Button.id.replace('tool-', '').replace('', '');
                    Ufoco.Functions.Toolbar.funcAutoPosition();

                    if ($Button === $ToolRemoteImage) {
                        $InputRemoteImage.select();
                    } else if ($Button === $ToolRemoteVideo) {
                        $InputRemoteVideo.select();
                    } else if ($Button === $ToolRemoteEmbed) {
                        $InputRemoteEmbed.select();
                    } else if ($Button === $ToolApplyLink) {
                        $InputApplyLink.select();
                    } else if ($Button === $ToolEmojis) {
                        $InputEmojis.select();
                    }
                }

                Ufoco.Functions.Toolbar.funcCheckTools();
            }

        });
    });



    forEach(Ufoco.$toolbarElt.getElementsByClassName('cancel-tool'), ($Button) => {
        $Button.addEventListener('click', () => {
            Ufoco.Functions.Toolbar.funcResetView();
        });
    });


    $ValidateRemoteImage.addEventListener('click', () => {
        if ($InputRemoteImage.value) {
            $InputRemoteImage.classList.remove('invalid');
            lightrange.restoreSelection(Ufoco.activeDoc.LastSelection);
            Ufoco.activeDoc.Editor.insertImage($InputRemoteImage.value + Ufoco.Functions.Utils.funcNoCacheSuffix());
            Ufoco.Functions.Toolbar.funcResetView();
            Ufoco.Functions.Toolbar.funcAutoPosition();
        } else {
            $InputRemoteImage.classList.add('invalid');
        }
    });


    $ValidateRemoteVideo.addEventListener('click', () => {
        const ParsedURL = urlParser.parse($InputRemoteVideo.value);

        if (ParsedURL) {
            $InputRemoteVideo.classList.remove('invalid');

            lightrange.restoreSelection(Ufoco.activeDoc.LastSelection);

            // Cleared & Embed URL
            const strEmbedURL = urlParser.create({
                videoInfo: ParsedURL,
                format: 'embed'
            });

            // All embed video player at the same dimensions : 560px x 315px, which is the YouTube dimensions.
            if (ParsedURL.provider === 'youtube' || ParsedURL.provider === 'vimeo' || ParsedURL.provider === 'dailymotion' || ParsedURL.provider === 'twitch') {
                let strProtocol = '';

                if (ParsedURL.provider === 'youtube' || ParsedURL.provider === 'vimeo') {
                    strProtocol = 'https:';
                } else if (ParsedURL.provider === 'dailymotion') {
                    strProtocol = 'http:';
                }

                Ufoco.activeDoc.Editor.insertHTML(`<iframe src="${strProtocol}${strEmbedURL}" width="560" height="315" allowfullscreen></iframe>`);
            }

            Ufoco.Functions.Toolbar.funcResetView();
            Ufoco.Functions.Toolbar.funcAutoPosition();
        } else {
            $InputRemoteVideo.classList.add('invalid');
        }
    });


    $ValidateRemoteEmbed.addEventListener('click', () => {
        let strEmbedCode = $InputRemoteEmbed.value;
        const RegExpEmbed = new RegExp(/^<iframe.+><\/iframe>$/, 'i');

        if (RegExpEmbed.test(strEmbedCode)) {
            $InputRemoteEmbed.classList.remove('invalid');

            lightrange.restoreSelection(Ufoco.activeDoc.LastSelection);

            strEmbedCode = Ufoco.Functions.Content.funcPurifyHTML({
                strHTML: strEmbedCode,
                strAllowedContentMode: 'embed'
            });

            Ufoco.activeDoc.Editor.insertHTML(strEmbedCode);

            Ufoco.Functions.Toolbar.funcResetView();
            Ufoco.Functions.Toolbar.funcAutoPosition();
        } else {
            $InputRemoteEmbed.classList.add('invalid');
        }
    });


    $ValidateApplyLink.addEventListener('click', () => {
        if ($InputApplyLink.value) {
            $InputApplyLink.classList.remove('invalid');
            lightrange.restoreSelection(Ufoco.activeDoc.LastSelection);
            Ufoco.activeDoc.Editor.insertLink($InputApplyLink.value);
            Ufoco.Functions.Toolbar.funcResetView();
            Ufoco.Functions.Toolbar.funcAutoPosition();
        } else {
            $InputApplyLink.classList.add('invalid');
        }
    });



    // forEach(Emojis, (Emoji) => {
    //   console.log(Emoji);
    // });

    forEach(Ufoco.$toolbarElt.querySelectorAll('.emojis-view .category-buttons li'), ($Button) => {
        $Button.addEventListener('click', () => {
            // https://github.com/zengabor/zenscroll#8-execute-something-when-the-scrolling-is-done
            // .center(element, duration, offset, onDone)
            zenscroll.createScroller($EmojisList).center(document.querySelector($Button.dataset.anchor), null, -5);
        });
    });



    $InputRemoteImage.addEventListener('keyup', (Event) => {
        // Enter
        if (Event.keyCode === 13) {
            $ValidateRemoteImage.click();
        }
        // Escape
        else if (Event.keyCode === 27) {
            $CancelRemoteImage.click();
        }
    });

    $InputRemoteVideo.addEventListener('keyup', (Event) => {
        // Enter
        if (Event.keyCode === 13) {
            $ValidateRemoteVideo.click();
        }
        // Escape
        else if (Event.keyCode === 27) {
            $CancelRemoteVideo.click();
        }
    });

    $InputRemoteEmbed.addEventListener('keyup', (Event) => {
        // Enter
        if (Event.keyCode === 13) {
            $ValidateRemoteEmbed.click();
        }
        // Escape
        else if (Event.keyCode === 27) {
            $CancelRemoteEmbed.click();
        }
    });

    $InputApplyLink.addEventListener('keyup', (Event) => {
        // Enter
        if (Event.keyCode === 13) {
            $ValidateApplyLink.click();
        }
        // Escape
        else if (Event.keyCode === 27) {
            $CancelApplyLink.click();
        }
    });

    $InputEmojis.addEventListener('keyup', (Event) => {
        // Enter
        if (Event.keyCode === 13) {
            $SearchEmojis.click();
        }
        // Escape
        else if (Event.keyCode === 27) {
            $CancelEmojis.click();
        }
    });



    Mousetrap.bindGlobal('mod+1', () => {
        Ufoco.$toolH1Elt.click();
    });
    Mousetrap.bindGlobal('mod+2', () => {
        Ufoco.$toolH2Elt.click();
    });
    Mousetrap.bindGlobal('mod+3', () => {
        Ufoco.$toolH3Elt.click();
    });
    Mousetrap.bindGlobal('mod+4', () => {
        Ufoco.$toolH4Elt.click();
    });
    Mousetrap.bindGlobal('mod+5', () => {
        Ufoco.$toolH5Elt.click();
    });
    Mousetrap.bindGlobal('mod+6', () => {
        Ufoco.$toolH6Elt.click();
    });

    Mousetrap.bindGlobal('mod+shift+p', () => {
        $ToolParagraph.click();
    });
    Mousetrap.bindGlobal('mod+shift+q', () => {
        Ufoco.$toolQuoteElt.click();
    });
    Mousetrap.bindGlobal('mod+shift+l', () => {
        Ufoco.$toolUnorderedListElt.click();
    });
    Mousetrap.bindGlobal('mod+alt+l', () => {
        Ufoco.$toolOrderedListElt.click();
    });
    Mousetrap.bindGlobal('mod+alt+i', () => {
        Ufoco.$toolbarElt.classList.add('active');
        $ToolRemoteImage.click();
    });
    Mousetrap.bindGlobal('mod+alt+v', () => {
        Ufoco.$toolbarElt.classList.add('active');
        $ToolRemoteVideo.click();
        // Prevent triggering the paste event
        return false;
    });

    Mousetrap.bindGlobal('mod+b', () => {
        $ToolBold.click();
        // Prevent the Chromium default shortcut
        return false;
    });
    Mousetrap.bindGlobal('mod+i', () => {
        $ToolItalic.click();
        return false;
    });
    Mousetrap.bindGlobal('mod+u', () => {
        $ToolUnderline.click();
        return false;
    });
    Mousetrap.bindGlobal('mod+alt+s', () => {
        $ToolStrike.click();
    });
    Mousetrap.bindGlobal('mod+l', () => {
        Ufoco.$toolbarElt.classList.add('active');
        $ToolApplyLink.click();
    });
    Mousetrap.bindGlobal('mod+shift+up', () => {
        $ToolSuperscript.click();
    });
    Mousetrap.bindGlobal('mod+shift+down', () => {
        $ToolSubscript.click();
    });
    Mousetrap.bindGlobal('mod+shift+c', () => {
        $ToolClear.click();
    });

})();