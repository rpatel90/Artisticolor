require('js/init').init()
module.exports = async (uid) => [
    (await get(ref(db, `Users/${uid}/Password`))).val(),
    (await get(ref(db, `Users/${uid}/Key`))).val()
]