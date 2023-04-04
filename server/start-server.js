const concurrently = require('concurrently');

concurrently([
  { command: 'npm start', prefixColor: 'blue', cwd: 'client' },
  { command: 'npm start', prefixColor: 'green', cwd: 'server' },
]);
