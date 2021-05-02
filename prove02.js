const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.engine('ejs',require('ejs').__express);
app.set('view engine', 'ejs');
app.set('views', 'views');

const userData = require('./routes/prove02-input');
const main = require('./routes/prove02-main');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use(userData.routes);
app.use(main);



app.listen(3000);
