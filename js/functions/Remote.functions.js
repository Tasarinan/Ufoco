Ufoco.Functions.Remote = {};


Ufoco.Functions.Remote.funcGetUpdateInfo = (Parameters) => {
    reqwest({
        // url: `${Ufoco.strAppPath}/../CHANGELOG.md`,
        url: 'https://raw.githubusercontent.com/n457/Uncolored/master/CHANGELOG.md',
        success: (strResponse) => {
            let boolUpdateAvailable = false;

            // Remotly, strResponse.response doesn't work, use strResponse instead
            let strRemoteContent = Ufoco.Functions.Utils.funcMarkdownToHTML({ strContent: strResponse });

            if (strRemoteContent) {
                const strRemoteLastestVersion = strRemoteContent.match('- currentversion: (.*) -')[1];

                if (versionCompare(strRemoteLastestVersion, Ufoco.strAppVersion) > 0) {
                    boolUpdateAvailable = true;
                }

                Parameters.funcOnSuccess.call(null, {
                    boolUpdateAvailable: boolUpdateAvailable,
                    strRemoteLastestVersion: strRemoteLastestVersion,
                    strRemoteReleaseNotesHTML: strRemoteContent
                });
            }
        },
        error: (Error) => {
            console.error(Error);
            Parameters.funcOnError.call(null, Error);
        }
    });
};


Ufoco.Functions.Remote.funcGetPriorityInfo = (Parameters) => {
    reqwest({
        // url: `${Ufoco.strAppPath}/../project/docs/priority-info.md`,
        url: 'https://raw.githubusercontent.com/n457/Uncolored/master/project/docs/priority-info.md',
        success: (strResponse) => {
            // Remotly, strResponse.response doesn't work, use strResponse instead
            let strRemoteContent = Ufoco.Functions.Utils.funcMarkdownToHTML({ strContent: strResponse });

            if (strRemoteContent) {
                Parameters.funcOnSuccess.call(null, {
                    strRemotePriorityInfoHTML: strRemoteContent
                });
            }
        },
        error: (Error) => {
            console.error(Error);
            Parameters.funcOnError.call(null, Error);
        }
    });
};