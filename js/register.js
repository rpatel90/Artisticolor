import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js'
import { getDatabase, ref, set, get, child, onValue } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js'

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

function writeUserLoginData(userId, username, email, password) {
	//Set user login properties
	set(ref(db, 'Users/User ' + userId + '/Login Info'), {
	  	Username: username,
	  	Email: email,
	  	Password: password
	});
}

get(child(databaseRef, 'Users/User 0/Login Info')).then((snapshot) => {
	if(snapshot.exists()) {
		console.log(val());
	} else {
		//console.log('No data available')
	}
});

	


//----------Register----------------------------------------------------------------------------------------

//Get email, username, & password boxes
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');

document.getElementById('submit').addEventListener('click', function(){

	//Store information about the user
	let UserInfo = {
		lgnInfo: {
			email,
			username,
			password
		},
	};

	//Check if username is too big
	if(username.value.length > 20) {
		message.innerHTML = 'Username cannot exceed 20 characters';
		return;
	}

	//Add inputted values to UserInfo
	UserInfo.lgnInfo.username = username.value;
	UserInfo.lgnInfo.email = email.value;
	UserInfo.lgnInfo.password = password.value;

	//Stringify user data
	const strUserInfo = JSON.stringify(UserInfo);
	
	//Check if User0 exists
	let validator = JSON.parse(localStorage.getItem('User0 Data'));

	//Get message element
	let message = document.getElementById('message');

	//If User0 doesn't exist, add User0 to database
	console.log(get(child(databaseRef, 'Users')))

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