require('./init-fb').init();
const createUser = require('../utils/user/createUser')

//Show register box
document.getElementById('login-box').style.transition = '0s';
document.getElementById('login-box').style.transform = 'scale(1)';
document.getElementById('login-box').style.top = '0px';

document.getElementById('submit').addEventListener('click', function() {
	
	//Get email, username, & password boxes
	const email = document.getElementById('email');
	const username = document.getElementById('username');
	const password = document.getElementById('password');

	//Get message element
	const message = document.getElementById('message');

	//Check for blank inputs
	if(email.value == '' || username.value == '' || password.value == '') return;

	//Check if username > 15 characters
	if(username.value.length > 15) {
		message.innerHTML = 'Username cannot exceed 20 characters';
		return;
	}	

	//Create a user and add user to database
	createUser(auth, email, username, password);

});

//Move the label up when the input box is selected
document.getElementById('email').addEventListener('focus', () => {
    document.getElementById('emailLabel').style.transform = 'translateY(-200%)';
    document.getElementById('emailLabel').style.transition = '0.25s';
    
	if(document.getElementById('username').value == '') {
        document.getElementById('usernameLabel').style.transform = 'translateY(-50%)';
    }
	if(document.getElementById('password').value == '') {
        document.getElementById('passwordLabel').style.transform = 'translateY(-50%)';
    }  
});
document.getElementById('username').addEventListener('focus', () => {
    document.getElementById('usernameLabel').style.transform = 'translateY(-200%)';
    document.getElementById('usernameLabel').style.transition = '0.25s';
	
	if(document.getElementById('email').value == '') {
        document.getElementById('emailLabel').style.transform = 'translateY(-50%)';
    }
	if(document.getElementById('password').value == '') {
        document.getElementById('passwordLabel').style.transform = 'translateY(-50%)';
    }  
});
document.getElementById('password').addEventListener('focus', () => {
    document.getElementById('passwordLabel').style.transform = 'translateY(-200%)';
    document.getElementById('passwordLabel').style.transition = '0.25s';
    
	if(document.getElementById('email').value == '') {
        document.getElementById('emailLabel').style.transform = 'translateY(-50%)';
    }
	if(document.getElementById('username').value == '') {
        document.getElementById('usernameLabel').style.transform = 'translateY(-50%)';
    }
});

//Load styles
const register = require('../styles/register.css'),
	lgnregBox = require('../styles/lgnregBox.css')