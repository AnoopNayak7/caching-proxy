const yargs = require('yargs');
const startServer = require('./server');
const cache = require('./cache');

yargs.command({
    command: 'start',
    describe: 'Start the caching proxy server',
    builder: {
        port: {
            describe: 'Port to run the server on',
            demandOption: true,
            type: 'number'
        },
        origin: {
            describe: 'Origin server URL',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        startServer(argv.port, argv.origin);
    }
});

yargs.command({
    command: 'clear-cache',
    describe: 'Clear the cached responses',
    handler() {
        cache.clear();
        console.log('Cache cleared.');
    }
});

yargs.parse();
