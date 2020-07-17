const os = require('os');
const fs = require('fs');
const express = require('express');
const app = express();

const host = `${os.hostname}`;
const port = '8080';

app.get('/', (req, res) =>
{
    fs.readFile(`${__dirname}/src/index.html`, (err, data) =>
    {
        if(err)
        {
            console.log(`${__dirname}: ${err}`)
            res.status(500).end();
        }
        res.status(200).end(data);
    })
});

app.get('/index.js', (req, res) =>
{
    fs.readFile(`${__dirname}/lib/index.js`, (err, data) =>
    {
        if(err)
        {
            console.log(`${__dirname}: ${err}`)
            res.status(500).end();
        }
        res.status(200).end(data);
    })
});

app.get('/App.js', (req, res) =>
{
    fs.readFile(`${__dirname}/lib/App.js`, (err, data) =>
    {
        if(err)
        {
            console.log(`${__dirname}: ${err}`)
            res.status(500).end();
        }
        res.status(200).end(data);
    })
});

app.get('/App.css', (req, res) =>
{
    fs.readFile(`${__dirname}/src/App.css`, (err, data) =>
    {
        if(err)
        {
            console.log(`${__dirname}: ${err}`)
            res.status(500).end();
        }
        res.type('.css').status(200).end(data);
    })
});

app.get('/Calculator.js', (req, res) =>
{
    fs.readFile(`${__dirname}/lib/Calculator.js`, (err, data) =>
    {
        if(err)
        {
            console.log(`${__dirname}: ${err}`)
            res.status(500).end();
        }
        res.status(200).end(data);
    })
});

app.listen(port, host, () =>
{
    console.log(`Listening on ${host}:${port}`);
})