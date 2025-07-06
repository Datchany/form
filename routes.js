
const requestHandler = (req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
      <html>
        <body>
          <form action="/message" method="POST">
            <input type="text" name="message" placeholder="Enter message" required />
            <button type="submit">Submit</button>
          </form>
        </body>
      </html>
    `);
    return res.end();
  }

  if (req.url === '/message' && req.method === 'POST') {
    const body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1].replace(/\+/g, ' ');

      fs.writeFile('formValues.txt', message, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
};

module.exports = requestHandler; // Exporting handler
