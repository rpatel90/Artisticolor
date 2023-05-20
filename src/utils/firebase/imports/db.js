const database = require('@firebase/database')
module.exports = {
    get: database.get,
    set: database.set,
    ref: database.ref,
    getDatabase: database.getDatabase
}