import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import { getDatabase, ref, set, get, child, update } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js'

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

//Get the email and password input boxes
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

//Sign in user when login button is pressed
document.getElementById('login').addEventListener('click', function() {
    signInWithEmailAndPassword(email, password).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      
      //console.log(userC)
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(error)
    });
});

onAuthStateChanged(auth, (user) => {
    if(user) { 
        //Get unique user id from database
        const uid = user.uid

        const loginBtn = document.getElementById('lgnButton')

        const navBar = document.getElementById('navigation')
        
        const pElement = document.createElement('p')
        pElement.setAttribute('id', 'displayName')

        //Go to the current user in database and get username value and display it in top right
        get(child(databaseRef, 'Users/' + uid + '/Username')).then((uname) => {
            user.displayName = uname._node.value_;
            loginBtn.remove()
            pElement.innerHTML = user.displayName;
            navBar.appendChild(pElement)
        });
        
        
    } else {

    }
});