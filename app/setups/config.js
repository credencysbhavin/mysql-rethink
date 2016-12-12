/*CONFIG*/

module.exports = {
    rethinkdb: {
        host: process.env.RETHINK_HOST,
        port: process.env.RETHINK_PORT,
        authKey: process.env.RETHINK_AUTH_KEY,
        db: process.env.RETHINK_DB_NAME
    }
};