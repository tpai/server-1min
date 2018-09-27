const ArgumentParser = require('argparse').ArgumentParser;
const parser = new ArgumentParser({ addHelp: true });

parser.addArgument([ '-p', '--port' ], {
  help: 'Specify port number.',
  defaultValue: 8000,
});
parser.addArgument([ '-f', '--file' ], {
  help: 'Import routes file.',
  defaultValue: './routes.js',
});

const args = parser.parseArgs();

module.exports = args;
