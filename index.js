const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const objData = JSON.parse(data);

// Create  simple server
const server = http.createServer((req,res) => {
    //const path = req.url;

    const {query, pathname} = url.parse(req.url, true);

    
    if(pathname === '/' || pathname === '/overview')
    {
        res.writeHead(200, {'Content-type': 'text/html'});

        const cards = objData.map((el) => {
           return replaceTemplate(tempCard, el);
        }).join('');
        
        const outPut = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cards);

        res.end(outPut);
    }
    else if(pathname === '/product')
    {
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = objData[query.id];
        const outPut = replaceTemplate(tempProduct, product);
        res.end(outPut);
    }
    else if(pathname === '/api') {
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
