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
	  //console.log("object entries" + Object.entries(post));
	  
	  let keys = []
	  for (const [key] of Object.entries(post)) {
        //console.log(`${key}`); // "a 5", "b 7", "c 9"
		keys.push(`${key}`)
      }
	  //console.log(keys);
      // append string to data file
       dataString = "";
	   for (key of keys) {
		 console.log("key: " +key +" value; " + post[key]);
		 dataString = dataString.concat(key, ",", post[key], " ");
		 console.log("dataString: " + dataString)
		 if(key === "time"){
	       fs.appendFile('data_file.txt', dataString + '\n', function (err) {
            if (err) throw err;
            console.log('added \'' + dataString+ '\' to data file');
			dataString = "";
          });
	     }
	   }
    });
    //console.log(req.body.string);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Thank you for your response!');
  }
  //res.end();
}).listen(3000);

