const path = require('path');

const express = require('express');
const session = require('express-session');
const csrf = require('csurf');


const authRoutes = require('./routes/auth.routes');
const sessionConfig = require('./config/session');
const db = require("./data/database");
const addCSRFTokenMiddleware = require('./middlewares/csrf-token-middleware');
const errorHandlermiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const protectRoutesMiddleware = require('./middlewares/protect-routes');
const productsRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const loggedin = require('./routes/loggedIn.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/products/assets',express.static('product-data'));
app.use(express.urlencoded({extended: false}));

app.use(session(sessionConfig()));

app.use(csrf());

app.use(addCSRFTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use(loggedin);
app.use(protectRoutesMiddleware);
app.use('/admin', adminRoutes);   /*only routes with admin will make it in here*/

app.use(errorHandlermiddleware);

db.connectToDatabase().then( function(){
    app.listen(3000);
}).catch(function(error) {
    console.log('failed to connect to the database');
    console.log(error);
});

