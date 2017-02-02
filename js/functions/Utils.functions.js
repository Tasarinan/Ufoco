Ufoco.Functions.Utils = {};


Ufoco.Functions.Utils.funcSetDOMAppName = () => {
    forEach(document.getElementsByClassName('app-name'), ($Element) => {
        $Element.textContent = Ufoco.strAppName;
    });
};


// Parameter :
// - strPath
Ufoco.Functions.Utils.funcGetFilePathInfo = (Parameter) => {
    const strExtensionLowerCase = Ufoco.ElectronFramework.Path.extname(Parameter.strPath).toLowerCase();

    let strFormat = '';
    if (['.html', '.htm'].indexOf(strExtensionLowerCase) !== -1) {
        strFormat = 'HTML';
    } else if (['.md', '.markdown'].indexOf(strExtensionLowerCase) !== -1) {
        strFormat = 'Markdown';
    }

    return {
        strName: Ufoco.ElectronFramework.Path.basename(Parameter.strPath),
        strDirPath: Ufoco.ElectronFramework.Path.dirname(Parameter.strPath),
        strFormat: strFormat
    };
};


// Parameters :
// - strEvent
// - $Element
Ufoco.Functions.Utils.funcTriggerEvent = (Parameters) => {
    Parameters.$Element.dispatchEvent(new Event(Parameters.strEvent));
};


// http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
// https://github.com/sindresorhus/escape-string-regexp
// Parameter :
// - strRegExp
Ufoco.Functions.Utils.funcEscapeStringRegexp = (Parameter) => {
    return Parameter.strRegExp.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
};


Ufoco.Functions.Utils.funcNoCacheSuffix = () => {
    // http://stackoverflow.com/questions/728616/disable-cache-for-some-images/6116854#6116854
    return '?nocache2650=' + new Date().getTime();
};


Ufoco.Functions.Utils.funcMarkdownToHTML = (Parameter) => {
    try {
        return marked(Parameter.strContent);
    } catch (Error) {
        console.error(Error);
        // Error during the convertion.
        return false;
    }
};

Ufoco.Functions.Utils.funcHTMLToMarkdown = (Parameter) => {
    try {
        return toMarkdown(Parameter.strContent);
    } catch (Error) {
        console.error(Error);
        // Error during the convertion.
        return false;
    }
};