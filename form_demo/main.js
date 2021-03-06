const http = require('http');
const fs = require('fs');
const qs = require('querystring');

http.createServer(function (req, res) {
  if (req.method === "GET") {
    fs.readFile('form.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
      //////////////////res.end();
      console.log('Sent form to client.');
    });
  }
  
  else if (req.method === "POST") {  
    // receive data from post
    var body = '';
    req.on('data', function (data) {
      body += data;

      // exit if post is too large
      if (body.length > 1e6) {
        req.connection.destroy();
      }
    });

    // add entry to data file
    req.on('end', function () {
      var post = qs.parse(body);
      //console.log(post['string']);

      // append string to data file
      fs.appendFile('data_file.txt', post['string'] + '\n', function (err) {
        if (err) throw err;
        console.log('added \'' + post['string'] + '\' to data file');
      });
    });
    //console.log(req.body.string);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Thank you for your response!');
  }
  //res.end();
}).listen(3000);

