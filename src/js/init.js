module.exports = {
    ...require('firebasedb/init'),    

    //Shorten code
    getElement: require('utils/shorten/getElement'),

    //Globalize exported data
    init: () => { for (const key in module.exports) global[key] = module.exports[key] }
}