const fs = require('fs');
const defaultSettings = require('../defaultSettings');

class Settings {
    constructor(configLocation) {
        this.settingsFile = configLocation;
        this.data = null;
        this.lastSync = 0;

        if (fs.existsSync(this.settingsFile)) {

        }
    }
}