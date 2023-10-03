const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

class FileWatcher extends EventEmitter {
    watch(directoryPath) {
        // Create a file watcher for the specified directory
        const watcher = fs.watch(directoryPath);

        watcher.on('change', (eventType, filename) => {
            if (eventType === 'rename') {
                // Emit 'created' event when a file is created
                this.emit('created', filename);
            } else if (eventType === 'change') {
                // Emit 'modified' event when a file is modified
                this.emit('modified', filename);
            }
        });

        watcher.on('error', (error) => {
            // Emit 'error' event in case of an error
            this.emit('error', error);
        });
    }
}

module.exports = FileWatcher;
