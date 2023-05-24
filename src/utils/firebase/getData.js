const datab = require('firebasedb/imports/db')
module.exports = async (uid) => [
    (await datab.get(datab.ref(db, `Users/${uid}/Password`))).val(),
    (await datab.get(datab.ref(db, `Users/${uid}/Key`))).val()
]