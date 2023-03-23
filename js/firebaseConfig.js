//Import firebase functions
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import { getDatabase, ref, set, get, child } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js'
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js'

//Export firebase variables
export const firebaseConfig = {
    apiKey: "AIzaSyC0AlemsEruFplUQFL5DVRg6oQtmfrhz_I",
    authDomain: "artisticolor-a55cf.firebaseapp.com",
    databaseURL: "https://artisticolor-a55cf-default-rtdb.firebaseio.com",
    projectId: "artisticolor-a55cf",
    storageBucket: "artisticolor-a55cf.appspot.com",
    messagingSenderId: "777420719697",
    appId: "1:777420719697:web:55131e8a4f5144f1891a70",
    measurementId: "G-JZ1H6Y93YL"
};
export const app = initializeApp(firebaseConfig);
export const database = getDatabase();
export const databaseRef = ref(database);
export const auth = getAuth();

//Exports firebase functions
export { 
    initializeApp,
    getDatabase,
    ref,
    set,
    get,
    child,
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
};