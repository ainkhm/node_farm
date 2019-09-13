const fs = require('fs');
const http = require('http');
const url = require('url');




const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const objData = JSON.parse(data);

// Create  simple server
const server = http.createServer((req,res) => {
    const path = req.url;

    if(path === '/' || path === '/overview')
    {
        res.writeHead(200, {'Content-type': 'text/html'});

        const cards = objData.map((el) => {
           return replaceTemplate(tempCard, el);
        });
        
        const outPut = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cards);

        res.end(outPut);
    }
    else if(path === '/product')
    {
        res.end(tempProduct);
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
