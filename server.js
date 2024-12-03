// const http = require('http');

// // Create an HTTP server
// const server = http.createServer((req, res) => {
//     // Set the response header
//     res.writeHead(200, { 'Content-Type': 'text/plain' });

//     // Send a response
//     res.end('Hello, World!\n');
// });

// // Start the server
// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}/`);
// });



import http from 'http'; // Import the HTTP module
import { v4 as uuidv4 } from 'uuid'; // Import the UUID module

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (method === 'GET' && url === '/html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>
    <p> - Martin Fowler</p>
  </body>
</html>`);
    } else if (method === 'GET' && url === '/json') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            slideshow: {
                author: "Yours Truly",
                date: "date of publication",
                slides: [
                    { title: "Wake up to WonderWidgets!", type: "all" },
                    {
                        title: "Overview",
                        type: "all",
                        items: [
                            "Why <em>WonderWidgets</em> are great",
                            "Who <em>buys</em> WonderWidgets"
                        ]
                    }
                ],
                title: "Sample Slide Show"
            }
        }));
    } else if (method === 'GET' && url === '/uuid') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ uuid: uuidv4() }));
    } else if (method === 'GET' && url.startsWith('/status/')) {
        const statusCode = parseInt(url.split('/')[2], 10);
        if (!isNaN(statusCode)) {
            res.writeHead(statusCode);
            res.end(`Response with status code ${statusCode}`);
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid status code');
        }
    } else if (method === 'GET' && url.startsWith('/delay/')) {
        const delayInSeconds = parseInt(url.split('/')[2], 10);
        if (!isNaN(delayInSeconds)) {
            setTimeout(() => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Success after delay');
            }, delayInSeconds * 1000);
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid delay value');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = 3990;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

