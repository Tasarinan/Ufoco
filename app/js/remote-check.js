(() => {

    const $AppCurrentVersion = Ufoco.$aboutDialogElt.getElementsByClassName('app-version')[0];

    const $NewUpdateDialog = document.getElementById('new-update-dialog');
    const $AppRemoteVersion = $NewUpdateDialog.getElementsByClassName('last-version')[0];
    const $RemoteReleaseNotes = $NewUpdateDialog.getElementsByClassName('release-notes')[0];

    const $RemotePriorityInfo = document.getElementById('priority-info-dialog').getElementsByClassName('mdl-card__supporting-text')[0];


    const funcUpdateCheck = () => {
        Ufoco.$aboutDialogElt.dataset.state = 'loading';

        Ufoco.Functions.Remote.funcGetUpdateInfo({
            funcOnSuccess: (UpdateCheckResult) => {
                if (UpdateCheckResult.boolUpdateAvailable) {
                    $AppRemoteVersion.textContent = UpdateCheckResult.strRemoteLastestVersion;
                    $RemoteReleaseNotes.innerHTML = UpdateCheckResult.strRemoteReleaseNotesHTML;
                    Ufoco.$aboutDialogElt.dataset.state = 'new-update';
                    Ufoco.Functions.Dialogs.funcShow({ strDialogSlug: 'new-update' });
                } else {
                    Ufoco.$aboutDialogElt.dataset.state = 'up-to-date';
                }
            },
            funcOnError: (Error) => {
                Ufoco.$aboutDialogElt.dataset.state = 'error';
            }
        });
    };

    const funcPriorityInfoCheck = () => {
        Ufoco.Functions.Remote.funcGetPriorityInfo({
            funcOnSuccess: (PriorityInfoResult) => {
                if (PriorityInfoResult.strRemotePriorityInfoHTML !== '') {
                    $RemotePriorityInfo.innerHTML = PriorityInfoResult.strRemotePriorityInfoHTML;
                    Ufoco.Functions.Dialogs.funcShow({ strDialogSlug: 'priority-info' });
                }
            },
            funcOnError: (Error) => {}
        });
    };


    Ufoco.$aboutDialogElt.getElementsByClassName('show-update-dialog')[0].addEventListener('click', () => {
        Ufoco.Functions.Dialogs.funcShow({ strDialogSlug: 'new-update' });
    });

    Ufoco.$aboutDialogElt.getElementsByClassName('recheck')[0].addEventListener('click', () => {
        funcUpdateCheck();
    });


    $AppCurrentVersion.textContent = Ufoco.strAppVersion;


    if (Ufoco.Settings.boolAutoUpdateCheck) {
        funcUpdateCheck();
    }

    let timerPriorityInfoCheck;
    timerPriorityInfoCheck = setTimeout(() => {
        funcPriorityInfoCheck();
        clearTimeout(timerPriorityInfoCheck);
    }, 4000);

})();