import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js'
import { getDatabase, ref, set, get, child } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js'
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js'

const firebaseConfig = {
    apiKey: "AIzaSyC0AlemsEruFplUQFL5DVRg6oQtmfrhz_I",
    authDomain: "artisticolor-a55cf.firebaseapp.com",
    databaseURL: "https://artisticolor-a55cf-default-rtdb.firebaseio.com",
    projectId: "artisticolor-a55cf",
    storageBucket: "artisticolor-a55cf.appspot.com",
    messagingSenderId: "777420719697",
    appId: "1:777420719697:web:55131e8a4f5144f1891a70",
    measurementId: "G-JZ1H6Y93YL"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();
const databaseRef = ref(database);
const auth = getAuth();

const email = document.getElementById('email').value
const password = document.getElementById('password').value



document.getElementById('lgnButton').addEventListener('click', function() {
    document.getElementById('wrapper').classList.add('popup');
    document.getElementById('message').innerHTML = '';
});
document.getElementById('close').addEventListener('click', function() {
    document.getElementById('wrapper').classList.remove('popup');
    document.getElementById('message').innerHTML = '';
});