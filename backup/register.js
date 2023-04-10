import * as fb from './firebaseConfig.js'

const CryptoJS = require('crypto-js')

//Show register box
document.getElementById('login-box').style.transform = 'scale(1)';
document.getElementById('login-box').style.transition = '0s';
document.getElementById('login-box').style.top = '0px';

document.getElementById('submit').addEventListener('click', function() {

	//Get email, username, & password boxes
	const email = document.getElementById('email');
	const username = document.getElementById('username');
	const password = document.getElementById('password');

	//Get message element
	const message = document.getElementById('message');

	//Check for blank inputs
	if(email.value == '' || username.value == '' || password.value == '') {
		return;
	}
	//Check if username is larger than 15 characters
	if(username.value.length > 15) {
		message.innerHTML = 'Username cannot exceed 20 characters';
		return;
	}

	//Encrypt data
	const encryptedEmail = CryptoJS.AES.encrypt(email.value, 'sha-256');
	const encryptedUsername = CryptoJS.AES.encrypt(username.value, 'sha-256');
	const encryptedPassword = CryptoJS.AES.encrypt(password.value, 'sha-256');

	//Create a user and add user to database
	fb.createUserWithEmailAndPassword(fb.auth, encryptedEmail, encryptedPassword).then((userCredential) => {
		
		const user = userCredential.user;
		const uid = user.uid;
		
		fb.updateProfile(user, {
			displayName: username
		});
		fb.set(fb.ref(fb.database, `Users/${uid}`), {
			Username: encryptedUsername,
			Email: encryptedEmail,
			Password: encryptedPassword,
		});
		
		location.href = './home.html'
	}).catch((error) => {
		const errorcode = error.code
		const errorMessage = error.message

		if(errorcode == 'auth/invalid-email') {
			message.innerHTML = 'Invalid email';

			email.classList.add('error');
            setTimeout((e) => { email.classList.remove('error') }, 500);
		}
		if(errorcode == 'auth/email-already-in-use') {
			message.innerHTML = 'Email is already in use';
		}
		if(errorcode == 'auth/weak-password') {
			message.innerHTML = 'Password should be at least 6 characters';
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