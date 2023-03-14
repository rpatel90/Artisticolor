import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js'
import { getDatabase, ref, set, onValue } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js'

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
const db = getDatabase()


function writeUserLoginData(userId, username, email, password) {

	set(ref(db, 'Users/User ' + userId + '/Login Info'), {
	  	Username: username,
	  	Email: email,
	  	Password: password
	});
}


//----------Register----------------------------------------------------------------------------------------

//Get email, username, & password boxes
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');

document.getElementById('submit').addEventListener('click', function(){

	//Store information about the user
	let UserInfo = {
		lgnInfo: {
			email: "",
			username: "",
			password: ""
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

	//Store localStorage length property
	const lsLength = localStorage.length;
	
	//Check if User0 exists
	let validator = JSON.parse(localStorage.getItem('User0 Data'));

	//Get message element
	let message = document.getElementById('message');

	//If User0 doesn't exist, add User0 to localStorage
	if(validator == null) {
		writeUserLoginData(
			'0',
			UserInfo.lgnInfo.username,
			UserInfo.lgnInfo.email,
			UserInfo.lgnInfo.password
		)

		//Redirect user to login page
		//location.href = "../html/home.html";
	} else { //If it does exist then check if registered data is already in use
		for(let i=0; i<lsLength; i++) {
			//Fetch User Data from localStorage
			/*
			let validator = JSON.parse(localStorage.getItem('User'+i+' Data'));				

			if(UserInfo.lgnInfo.email == validator.lgnInfo.email) {
				//Give message to the user if email has already been registered
				message.innerHTML = 'That email has already been registered. Please pick another one.';
				
				//Add shake animation to email box
				email.classList.add('error');
				setTimeout(function() {
					email.classList.remove('error');
				}, 500);
				
				//Stop all
				return;
			} else if(UserInfo.lgnInfo.username == validator.lgnInfo.username) {
				//Give message to user if username has been taken
				message.innerHTML = 'That username has been taken. Please choose another.';
				
				//Add shake animation to username box
				username.classList.add('error');
				setTimeout(function() {
					username.classList.remove('error');
				}, 500);
				
				//Stop all
				return;
			}*/
			
			/*
			//Set message to blank
			message.innerHTML = '';
			
			//Redirect user to login page
			location.href = "login.html";
			*/

			//Stop all
			return;
		}
	}
});