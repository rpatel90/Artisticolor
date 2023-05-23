//Initialize app
const app = require('firebasedb/imports/app')
//Import required firebase functions
const auth = require('firebasedb/imports/auth')
const db = require('firebasedb/imports/db')
//Initialize Firebase
module.exports = {
    ...auth,
    ...db,
    auth: auth.getAuth(),
    db: db.getDatabase(),
    database: db.ref(db.getDatabase()),
}