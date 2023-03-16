import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import { getDatabase, ref, set, get, child, update } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js'

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

document.getElementById('logout').addEventListener('click', function() {
    
    auth.signOut().then(() => {
        location.href = 'home.html'
    })
});

onAuthStateChanged(auth, (user) => {
    if(user) {
        //get unique user id of logged in user
        const uid = user.uid;
        
        //Display the user's username in top right
        get(child(databaseRef, 'Users/' + uid + '/Username')).then((uname) => {
            //Get user's username value
            const usrname = uname._node.value_
            document.getElementById('username').value = usrname;
        });
    } else {
        alert('Logged out succuessfully')
    }
});