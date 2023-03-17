import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js'
import { getDatabase, ref, set, get, child } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js'
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js'

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
const database = getDatabase(app);
const databaseRef = ref(database);
const auth = getAuth(app);

//----------Register----------------------------------------------------------------------------------------

document.getElementById('submit').addEventListener('click', function(){

	//Get email, username, & password boxes
	const email = document.getElementById('email').value;
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	//Get message element
	let message = document.getElementById('message');

	//Check if username is too big
	if(username == null) {
		return
	}
	if(username.length > 20) {
		message.innerHTML = 'Username cannot exceed 20 characters';
		return;
	}

	//Create a user and add user to database
	createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
		
		const user = userCredential.user;
		user.displayName = username

		const dt = new Date();
		const date = JSON.stringify(dt);

		set(ref(database, 'Users/' + user.uid), {
			Username: username,
			Email: email,
			Password: password,
			Last_login: date
		});
		
		//location.href = 'home.html'
	}).catch((error) => {
		const errorcode = error.code
		const errorMessage = error.message

		message.innerHTML = errorMessage;
	});

});
	/*

email.classList.add('error');
setTimeout(function() {
	email.classList.remove('error');
}, 500);

writeUserLoginData(
	'0',
	UserInfo.lgnInfo.username,
	UserInfo.lgnInfo.email,
	UserInfo.lgnInfo.password
)

*/