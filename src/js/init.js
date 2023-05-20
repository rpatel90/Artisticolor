//Initialize app
const app = require('database/imports/app')
//Import required firebase functions
const auth = require('database/imports/auth')
const db = require('database/imports/db')

//Export loaded libraries & initialization functions
module.exports = {
    //Expand firebase libs
    ...auth,
    ...db,

    //Initialize firebase
    auth: auth.getAuth(),
    db: db.getDatabase(),
    database: db.ref(db.getDatabase()),

    //Shorten code
    getElement: require('utils/shorten/getElement'),

    //Globalize exported data
    init: () => { for (const key in module.exports) global[key] = module.exports[key] }
}