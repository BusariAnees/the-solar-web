const path = require('path');

const express = require('express');
const session = require('express-session');
const csrf = require('csurf');


const authRoutes = require('./routes/auth.routes');
const sessionConfig = require('./config/session');
const db = require("./data/database");
const addCSRFTokenMiddleware = require('./middlewares/csrf-token-middleware');
const errorHandlermiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleare = require('./middlewares/check-auth');
const productsRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use(session(sessionConfig()));

app.use(csrf());

app.use(addCSRFTokenMiddleware);
app.use(checkAuthStatusMiddleare);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);

app.use(errorHandlermiddleware);

db.connectToDatabase().then( function(){
    app.listen(3000);
}).catch(function(error) {
    console.log('failed to connect to the database');
    console.log(error);
});

