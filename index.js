const fs = require('fs');
const http = require('http');
const url = require('url');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const objData = JSON.parse(data);

// Create  simple server
const server = http.createServer((req,res) => {
    const path = req.url;

    if(path === '/' || path === '/home')
    {
        res.end('<h1>Home Page</h1>')
    }
    else if(path === '/users')
    {
        res.end('<h1>users Page</h1>')
    }
    else if(path === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);
    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello Andrii'
        });

        res.end('<h1>Page not Found!</h1>');
    }

});

server.listen(8081, '127.0.0.1', () => {
    console.log('listening to requests on port 8081');
});
