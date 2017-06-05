const fs = require('fs');
const defaultSettings = require('./Settings.default.js');

class Settings {
    constructor(configLocation) {
        this.settingsFile = configLocation;
        this.data = null;
        this.lastSync = 0;

        if (fs.existsSync(this.settingsFile)) {
            this.load();
            if (Object.keys(this.data).length != Object.keys(defaultSettings).length) {
                this.load_missing();
            }
        } else {
            this.data = defaultSettings;
            this.save(true);
        }

    }

    get(key) {
        if (typeof this.data[key] === 'undefined' || this.data[key] === null) {
            this.set(key, defaultSettings[key]);
        }
        return this.data[key];
    }
    set(key, value) {
        this.data[key] = value;
        this.save();
    }
    load(retryCount = 5) {
        try {
            this.data = JSON.parse(fs.readFileSync(this.settingsFile, 'utf8'));
        } catch (e) {
            if (retryCount > 0) {
                setTimeout(this.load.bind(this, retryCount - 1), 10);
                console.log('Failded to load settings from Json file, retrying in 10 milliseconds');
                return;
            }
            this.data = defaultSettings;
            console.log('Failed to load settings JSON file, giving up and resetting')
        }
    }
    load_missing() {
        for (var prop in defaultSettings) {
            this.get(prop);
        }
    }

    save(force) {
        const now = (new Date()).getTime();

        // don't blast the disk
        if ((now - this.lastSync > 250 || force)) {
            if (this.data) {
                try {
                    fs.writeFileSync(this.settingsFile, JSON.stringify(this.data, null, 4))
                } catch (e) {
                    if (this.saving) clearTimeout(this.saving)
                    this.saving = setTimeout(this.save.bind(this), 275)
                }
            }
            if (this.saving) clearTimeout(this.saving)
        } else {
            if (this.saving) clearTimeout(this.saving)
            this.saving = setTimeout(this.save.bind(this), 275)
        }
        this.lastSync = now
    }

    destroy() {
        this.data = null
        fs.unlinkSync(this.settingsFile)
    }

}


module.exports = Settings