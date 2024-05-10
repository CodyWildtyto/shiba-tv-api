require('dotenv').config();

const express = require('express');
const app = express();

const channel = require('./channel');
const video = require('./video');

app.get('/channels', channel.getAll);
app.get('/video', video.getOne);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server ready on port ${port}.`));

module.exports = app;
