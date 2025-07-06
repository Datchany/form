const http = require('http');
const routes = require('./routes');

const server = http.createServer(routes);

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});


