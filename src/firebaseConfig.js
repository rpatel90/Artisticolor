//Import firebase functions
//import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
//import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';
//import { getDatabase, ref, set, get, child } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js';

// firebase services import
//const App = require('firebase/app');
const Auth = require('firebase/auth')
const Db = require('firebase/database')

const firebaseConfig = require('firebase/app').initializeApp({
    apiKey: "AIzaSyC0AlemsEruFplUQFL5DVRg6oQtmfrhz_I",
    authDomain: "artisticolor-a55cf.firebaseapp.com",
    databaseURL: "https://artisticolor-a55cf-default-rtdb.firebaseio.com",
    projectId: "artisticolor-a55cf",
    storageBucket: "artisticolor-a55cf.appspot.com",
    messagingSenderId: "777420719697",
    appId: "1:777420719697:web:55131e8a4f5144f1891a70",
    measurementId: "G-JZ1H6Y93YL"
});

const database = Db.getDatabase(firebaseConfig);
const auth = Auth.getAuth(firebaseConfig);
const databaseRef = Db.ref(database);
/*
const setKey = async () => {
    var Key = await Db.get(Db.child(databaseRef, 'Users/Key')).then((key) => {
        //console.log(key._node.value_)
        return key._node.value_;
    });
    console.log(Key)
}
console.log(Key)
console.log(setKey())
*/
/*
setKey().then((KEY) => {
    
    
    console.log(module.exports)
});
*/


module.exports = {
    Auth,
    Db,
    database,
    databaseRef,
    auth,
};