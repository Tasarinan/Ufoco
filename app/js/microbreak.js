const { ipcRenderer } = require('electron')

document.getElementById('close').addEventListener('click', function(e) {
    ipcRenderer.send('finish-microbreak', false)
})

ipcRenderer.on('microbreakIdea', (event, message, strictMode) => {
    if (!strictMode) {
        document.getElementById('close').style.visibility = 'visible'
    }
    let microbreakIdea = document.getElementsByClassName('microbreak-idea')[0]
    microbreakIdea.innerHTML = message
})