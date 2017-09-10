const express = require('express');
const app = express();
const { port, dbURI } = require('./config/environment');

const expressLayouts  = require('express-ejs-layouts');
const morgan = require('morgan');

const routes = require('./config/routes');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

//middleware
app.use(morgan('dev'));

app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));


app.use(routes);

app.listen(port, () => console.log(`Express is listening on port ${port}`));
