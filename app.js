const fs = require('fs');
const express = require('express');
const app = express();

const host = 'localhost';
const port = '3000';

app.get('/', (req, res) =>
{
    fs.readFile(`${__dirname}/src/index.html`, (err, data) =>
    {
        if(err)
        {
            console.log(`${__dirname}: ${err}`)
            res.status(500).end();
        }
        res.status(200);
        res.end(data);
    })
});

app.get('/index.js', (req, res) =>
{
    fs.readFile(`${__dirname}/src/index.js`, (err, data) =>
    {
        if(err)
        {
            console.log(`${__dirname}: ${err}`)
            res.status(500).end();
        }
        res.status(200);
        res.end(data);
    })
});

app.get('/App.js', (req, res) =>
{
    fs.readFile(`${__dirname}/src/App.js`, (err, data) =>
    {
        if(err)
        {
            console.log(`${__dirname}: ${err}`)
            res.status(500).end();
        }
        res.status(200);
        res.end(data);
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
        res.status(200);
        res.end(data);
    })
});

app.get('/Calculator.js', (req, res) =>
{
    fs.readFile(`${__dirname}/src/Calculator.js`, (err, data) =>
    {
        if(err)
        {
            console.log(`${__dirname}: ${err}`)
            res.status(500).end();
        }
        res.status(200);
        res.end(data);
    })
});

app.listen(port, host, () =>
{
    console.log(`Listening on ${port}:${host}`);
})