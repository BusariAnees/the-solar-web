const mongodbStore = require('connect-mongodb-session');

function createSessionStore (session){
    const mongoDbstore = mongodbStore(session);

    const sessionStore = new mongoDbstore({
        uri: 'mongodb://127.0.0.1:27017',
        databaseName: 'solar-blog',
        collection: 'session',
    });
    return sessionStore
}

function createSessionConfig (sessionStore){
    return {
        secret: 'super-secret',
        resave: false,
        saveUnitialized: false,
        store: sessionStore,
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000
        }
    }

}


module.exports = {
    createSessionStore: createSessionStore,
    createSessionConfig: createSessionConfig,
}
