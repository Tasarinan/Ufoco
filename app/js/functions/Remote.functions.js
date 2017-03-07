Ufoco.Functions.Remote = {};


Ufoco.Functions.Remote.funcGetUpdateInfo = (parameters) => {
    reqwest({
        // url: `${Ufoco.strAppPath}/../CHANGELOG.md`,
        url: 'https://raw.githubusercontent.com/Tasarinan/Ufoco/master/CHANGELOG.md',
        success: (strResponse) => {
            let boolUpdateAvailable = false;

            // Remotly, strResponse.response doesn't work, use strResponse instead
            let strRemoteContent = Ufoco.Functions.Utils.funcMarkdownToHTML({ strContent: strResponse });

            if (strRemoteContent) {
                const strRemoteLastestVersion = strRemoteContent.match('- currentversion: (.*) -')[1];

                if (versionCompare(strRemoteLastestVersion, Ufoco.strAppVersion) > 0) {
                    boolUpdateAvailable = true;
                }

                parameters.funcOnSuccess.call(null, {
                    boolUpdateAvailable: boolUpdateAvailable,
                    strRemoteLastestVersion: strRemoteLastestVersion,
                    strRemoteReleaseNotesHTML: strRemoteContent
                });
            }
        },
        error: (Error) => {
            console.error(Error);
            parameters.funcOnError.call(null, Error);
        }
    });
};


Ufoco.Functions.Remote.funcGetPriorityInfo = (parameters) => {
    reqwest({
        // url: `${Ufoco.strAppPath}/../project/docs/priority-info.md`,
        url: 'https://raw.githubusercontent.com/Tasarinan/Ufoco/master/LICENSE.md',
        success: (strResponse) => {
            // Remotly, strResponse.response doesn't work, use strResponse instead
            let strRemoteContent = Ufoco.Functions.Utils.funcMarkdownToHTML({ strContent: strResponse });

            if (strRemoteContent) {
                parameters.funcOnSuccess.call(null, {
                    strRemotePriorityInfoHTML: strRemoteContent
                });
            }
        },
        error: (Error) => {
            console.error(Error);
            parameters.funcOnError.call(null, Error);
        }
    });
};