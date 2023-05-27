require('./init').init();

//Show register box
getElement('login-box').style.transition = '0s';
getElement('login-box').style.transform = 'scale(1)';
getElement('login-box').style.top = '0px';

//Get email, username, & password boxes
const email = getElement('email');
const username = getElement('username');
const password = getElement('password');

getElement('submit').addEventListener('click', () => {

	//Get message element
	const message = getElement('message');

	//Check for blank inputs
	if(email.value == '' || username.value == '' || password.value == '') return;

	//Check if username > 15 characters
	if(username.value.length > 15) {
		message.innerHTML = 'Username cannot exceed 20 characters';
		return;
	}	

	//Create a user and add user to database
	require('utils/user/createUser')(auth, email, username, password)

});

//Move the label up when the input box is selected
require('utils/anim/register/box').addListeners()

//Load styles
require('styles/register.scss'), require('styles/lgnregBox.scss')