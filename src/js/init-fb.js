require('firebase/app').initializeApp({
    apiKey: "AIzaSyC0AlemsEruFplUQFL5DVRg6oQtmfrhz_I",
    authDomain: "artisticolor-a55cf.firebaseapp.com",
    databaseURL: "https://artisticolor-a55cf-default-rtdb.firebaseio.com",
    projectId: "artisticolor-a55cf",
    storageBucket: "artisticolor-a55cf.appspot.com",
    messagingSenderId: "777420719697",
    appId: "1:777420719697:web:55131e8a4f5144f1891a70",
    measurementId: "G-JZ1H6Y93YL"
});

//Load necessary firebase libraries
const fbExp = { ...require('firebase/auth'), ...require('firebase/database') };

//Export loaded libraries & initialization functions
module.exports = {
    ...fbExp,
    auth: fbExp.getAuth(),
    db: fbExp.getDatabase(),
    database: fbExp.ref(fbExp.getDatabase()),
    db: fbExp.getDatabase(),
    //Globalize exported data
    init: () => { for (const key in module.exports) { global[key] = module.exports[key] } }
}

if(window.location.href.includes('register')) {
    document.body.style.backgroundImage = 'url(../images/back.png)';
    document.body.style.backgroundSize = 'cover';
}