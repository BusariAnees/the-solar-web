const expressSession = require('express-session');
const mongodbStore = require('connect-mongodb-session');

function createSessionStore (){
    const mongoDbstore = mongodbStore(expressSession);

    const sessionStore = new mongoDbstore({
        uri:  'mongodb://localhost:27017',
        databaseName: 'solar-shop',
        collection: 'session',
    });
    return sessionStore
}

function createSessionConfig (){
    return {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000
        }
    }

}


module.exports =  createSessionConfig;
