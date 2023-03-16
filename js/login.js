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
const user = auth.currentUser;

//Get the email and password input boxes
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
/*
//Add event listener to login button if user is not logged in
if(document.getElementById('lgnButton').innerHTML != 'Login') {
    document.getElementById('login').addEventListener('click', function() {
        //Get message element
        let message = document.getElementById('message');
    
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            
            const user = userCredential.user;
            const dt = new Date();
    
            update(ref(database), 'Users/' + user.uid), {
                last_login: dt
            }
            
            get(child(databaseRef, 'Users/' + user.uid + '/Username')).then((uname) => {
                alert('Welcome' + uname);
            });
            
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(error)
        });
    });
}*/

document.getElementById('login').addEventListener('click', function() {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in 
      const userC = userCredential.user;
      console.log(userC)
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
});

onAuthStateChanged(auth, (user) => {
    if(user) {
        //get unique user id of logged in user
        const uid = user.uid;
        
        //Display the user's username in top right
        get(child(databaseRef, 'Users/' + uid + '/Username')).then((uname) => {
            console.log(uname)
            //Get user's username value
            const username = uname._node.value_
            document.getElementById('lgnButton').innerHTML = username;
        });
    } else {

    }
});