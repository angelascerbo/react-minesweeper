const http = require('http');
const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('*/bundle.js', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/bundle.js'))
})

app.listen(8000, () => {
	console.log('Listening on 8000')
})