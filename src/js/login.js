require('./init').init();

onAuthStateChanged(auth, (user) => {
    if(user) {
        console.log(user);
        
        //Create element to display user's username
        const aElement = document.createElement('a');
        aElement.setAttribute('id', 'displayName');
        aElement.classList.add('userDisplay');
        
        //Display user display name
        getElement('lgnButton').remove();
        getElement('navigation').appendChild(aElement);

        aElement.innerHTML = `${user.displayName}${require('lib/templates/user-dropdown.js')}`

        //Close login window
        require('anim/login/box').close();
    } else {
        //Sign in user when login button is pressed
        getElement('login-box').style.transform = 'scale(0)';

        //If login button pressed then login the user
        getElement('login').addEventListener('click', (e) => {
            e.preventDefault();
            require('utils/user/signInUser')(auth, getElement('email'), getElement('password'))
        });
    }
});

require('anim/login/box').addListeners()
//Load Styles
require('styles/lgnregBox.scss')