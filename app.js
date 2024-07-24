const path = require('path');

const express = require('express');
// const session = require('express-session');
// const csurf = require('csurf');

const authRoutes = require('./routes/auth.routes')
// const sessionConfig = require('./config/session');
const db = require("./data/database");

// const MongoDbSessionStore = sessionConfig.createSessionStore(session);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

// app.use(session(sessionConfig.createSessionConfig(MongoDbSessionStore)));

app.use(authRoutes);

db.connectToDatabase().then( function(){
    app.listen(3000);
}).catch(function(error) {
    console.log('failed to connect to the database');
    console.log(error);
});

