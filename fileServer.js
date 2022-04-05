var http = require('http');
var fs = require('fs');

const server = http.createServer(function (req, res) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, 
        "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept"
      };
      
    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        res.end();
        return;
      }
    
      if (['POST'].indexOf(req.method) > -1) {
        req.on('data', data =>{
            fs.writeFile('./src/ImageTable/test.json', data, (err) => {
                if (err) console.log(err);
                console.log('The file has been saved!');
            });
            res.writeHead(200, headers);
            res.end(data);
        })
        
        return;
      }
    
      res.writeHead(405, headers);
      res.end(`${req.method} is not allowed for the request.`);
});

server.listen(9615, 'localhost', () => {
    console.log('Server is running on port 9615'); });