const http = require('http')
const fs = require('fs')

http.createServer(function (req, res) {
  fs.readFile('form.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
    console.log('Sent form to client.');
  });
}).listen(3000);

