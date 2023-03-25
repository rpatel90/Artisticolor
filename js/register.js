import { //Firebase variables
	firebaseConfig,
	app,
	database,
	databaseRef,
	auth,
} from './firebaseConfig.js';
import { // Firebase functions
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
} from './firebaseConfig.js';

const crypto = require('crypto');
const password = 'myPassword123';
const salt = crypto.randomBytes(16).toString('hex');
const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
console.log(salt);
console.log(hash);


document.getElementById('login-box').style.transform = 'scale(1)';
document.getElementById('login-box').style.transition = '0s';
document.getElementById('login-box').style.top = '0px';

document.getElementById('submit').addEventListener('click', function() {

	//Get email, username, & password boxes
	const email = document.getElementById('email').value;
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	//Get message element
	const message = document.getElementById('message');

	//Check if username is too big
	if(email == '' || username == '' || password == '') {
		return;
	}
	if(username.length > 15) {
		message.innerHTML = 'Username cannot exceed 20 characters';
		return;
	}

	//Create a user and add user to database
	createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
		
		const user = userCredential.user;
		const uid = user.uid;
		
		const lastLogin = JSON.stringify(user.metadata.lastSignInTime)

		updateProfile(user, {
			displayName: username
		});
		set(ref(database, `Users/${uid}`), {
			Username: username,
			Email: email,
			Password: password,
			Last_Login: lastLogin,
		});
		
		location.href = './home.html'
	}).catch((error) => {
		const errorcode = error.code
		const errorMessage = error.message

		if(errorcode == 'auth/invalid-email') {
			message.innerHTML = 'Invalid email'
		}
		if(errorcode == 'auth/weak-password') {
			message.innerHTML = 'Password should be at least 6 characters'
		}
	});

});

//Move the label up when the input box is selected
document.getElementById('email').addEventListener('focus', function() {
    document.getElementById('emailLabel').style.transform = 'translateY(-200%)';
    document.getElementById('emailLabel').style.transition = '0.25s';
    
	if(document.getElementById('username').value == '') {
        document.getElementById('usernameLabel').style.transform = 'translateY(-50%)';
    }
	if(document.getElementById('password').value == '') {
        document.getElementById('passwordLabel').style.transform = 'translateY(-50%)';
    }  
});
document.getElementById('username').addEventListener('focus', function() {
    document.getElementById('usernameLabel').style.transform = 'translateY(-200%)';
    document.getElementById('usernameLabel').style.transition = '0.25s';
    
	if(document.getElementById('email').value == '') {
        document.getElementById('emailLabel').style.transform = 'translateY(-50%)';
    }
	if(document.getElementById('password').value == '') {
        document.getElementById('passwordLabel').style.transform = 'translateY(-50%)';
    }  
});
document.getElementById('password').addEventListener('focus', function() {
    document.getElementById('passwordLabel').style.transform = 'translateY(-200%)';
    document.getElementById('passwordLabel').style.transition = '0.25s';
    if(document.getElementById('email').value == '') {
        document.getElementById('emailLabel').style.transform = 'translateY(-50%)';
    }
	if(document.getElementById('username').value == '') {
        document.getElementById('usernameLabel').style.transform = 'translateY(-50%)';
    }
});