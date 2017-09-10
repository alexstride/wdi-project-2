const express = require('express');
const app = express();

const expressLayouts  = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const session = require('express-session');
const flash = require('express-flash');
const userAuth = require('./lib/userAuth');


//internal requires
const { port, dbURI, secret } = require('./config/environment');
const routes = require('./config/routes');

//connecting to database
mongoose.connect(dbURI, { useMongoClient: true });

//express settings
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false
}));
app.use(flash());


//middleware setup
app.use(expressLayouts);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(req => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(userAuth);



//Applying router
app.use(routes);

//Starting up server
app.listen(port, () => console.log(`Express is listening on port ${port}`));
