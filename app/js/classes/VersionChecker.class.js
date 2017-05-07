class VersionChecker {
    latest(callback) {
        fetch('https://raw.githubusercontent.com/Tasarinan/Ufoco/master/CHANGELOG.md', {
            method: 'GET',
            headers: { 'Content-Type': 'text/plain' },
            mode: 'cors',
            cache: 'default'
        }).then(function(response) {
            return response.text()
        }).then(function(body) {
            let json = JSON.parse(body)
            callback(json.tag_name)
        }).catch(function(ex) {
            callback('Error getting latest version')
        })
    }
}

module.exports = VersionChecker