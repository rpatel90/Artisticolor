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

//Unpack firebase auth and database module
const fbExp = { ...require('firebase/auth'), ...require('firebase/database') }

//Export Firebase object containing all necessary firebase operations 
module.exports = {
    ...fbExp,
    auth: fbExp.getAuth(),
    database: fbExp.ref(fbExp.getDatabase()),
    init: () => { for (const key in module.exports) { window[key] = module.exports[key] } },
}