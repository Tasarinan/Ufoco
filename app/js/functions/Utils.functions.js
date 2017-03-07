Ufoco.Functions.Utils = {};


Ufoco.Functions.Utils.funcSetDOMAppName = () => {
    forEach(document.getElementsByClassName('app-name'), ($Element) => {
        $Element.textContent = Ufoco.strAppName;
    });
};


// parameter :
// - strPath
Ufoco.Functions.Utils.funcGetFilePathInfo = (parameter) => {
    const strExtensionLowerCase = Ufoco.ElectronFramework.Path.extname(parameter.strPath).toLowerCase();

    let strFormat = '';
    if (['.html', '.htm'].indexOf(strExtensionLowerCase) !== -1) {
        strFormat = 'HTML';
    } else if (['.md', '.markdown'].indexOf(strExtensionLowerCase) !== -1) {
        strFormat = 'Markdown';
    }

    return {
        strName: Ufoco.ElectronFramework.Path.basename(parameter.strPath),
        strDirPath: Ufoco.ElectronFramework.Path.dirname(parameter.strPath),
        strFormat: strFormat
    };
};


// parameters :
// - strEvent
// - $Element
Ufoco.Functions.Utils.funcTriggerEvent = (parameters) => {
    parameters.$Element.dispatchEvent(new Event(parameters.strEvent));
};


// http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
// https://github.com/sindresorhus/escape-string-regexp
// parameter :
// - strRegExp
Ufoco.Functions.Utils.funcEscapeStringRegexp = (parameter) => {
    return parameter.strRegExp.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
};


Ufoco.Functions.Utils.funcNoCacheSuffix = () => {
    // http://stackoverflow.com/questions/728616/disable-cache-for-some-images/6116854#6116854
    return '?nocache2650=' + new Date().getTime();
};


Ufoco.Functions.Utils.funcMarkdownToHTML = (parameter) => {
    try {
        return marked(parameter.strContent);
    } catch (Error) {
        console.error(Error);
        // Error during the convertion.
        return false;
    }
};

Ufoco.Functions.Utils.funcHTMLToMarkdown = (parameter) => {
    try {
        return toMarkdown(parameter.strContent);
    } catch (Error) {
        console.error(Error);
        // Error during the convertion.
        return false;
    }
};