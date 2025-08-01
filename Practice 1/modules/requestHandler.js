const fs = require('fs');
const addNumbers = require('./addition');

function sendFile(res, path, contentType) {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end("Internal Server Error");
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

function requestHandler(req, res) {
    if (req.method === "GET" && req.url === "/") {
        return sendFile(res, "views/index.html", "text/html");

    } else if (req.method === "GET" && req.url === "/calculator") {
        return sendFile(res, "views/calculator.html", "text/html");

    } else if (req.method === "POST" && req.url === "/calculate-result") {
        // Read POST data
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            const params = {};
            body.split("&").forEach(pair => {
                const [key, value] = pair.split("=");
                params[key] = decodeURIComponent(value);
            });

            const num1 = params.num1;
            const num2 = params.num2;
            const sum = addNumbers(num1, num2);

            const resultHTML = `
                <!DOCTYPE html>
                <html>
                <head><title>Result</title></head>
                <body>
                    <h1>Result: ${num1} + ${num2} = ${sum}</h1>
                    <a href="/">Back to Home</a>
                </body>
                </html>`;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(resultHTML);
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("404 Not Found");
    }
}

module.exports = requestHandler;
