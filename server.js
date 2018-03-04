const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const api = require('./routes/api');

const port = 3000;

var app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Static folder
app.use(express.static(path.join(__dirname, 'client/dist')));

// Body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api', api);

app.listen(port, () => console.log(`Kolabr is listening on port ${port}`));