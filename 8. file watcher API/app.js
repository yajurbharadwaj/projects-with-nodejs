const FileWatcher = require('./fileWatcher');

// Create an instance of the FileWatcher
const watcher = new FileWatcher();

// Define the directory to watch
const directoryToWatch = './app';

// Start watching the directory
watcher.watch(directoryToWatch);

// Listen for events
watcher.on('created', (filename) => {
    console.log(`File created: ${filename}`);
});

watcher.on('modified', (filename) => {
    console.log(`File modified: ${filename}`);
});

watcher.on('error', (error) => {
    console.error(`Error: ${error.message}`);
});
