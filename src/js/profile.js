require('./init').init();

onAuthStateChanged(auth, (user) => {
    if(user) { //User is logged in
        //Detect and sign out user from account
        require('utils/user/signOutUser')
        
        //Decrypt user password
        const decryptPassword = require('firebasedb/getData')(user.uid)
            .then(data => {return require('utils/crypto/decrypt')(data[0], data[1])});
        
        decryptPassword.then(pwd => getElement('Passwd').value = pwd );
        
        //Create img element to display user profile photo 
        const imgEl = document.createElement('img');
        imgEl.setAttribute('id', 'profilePhoto');
        imgEl.setAttribute('src', user.photoURL);
        getElement('header').appendChild(imgEl); 

        //Display username and email
        getElement('Email').value = user.email;
        getElement('Username').value = user.displayName;

        //Get password icon element
        const pd = getElement('pdIcon');

        //Create div to cover the page when user is prompted to enter password
        const coverDiv = document.createElement('div');

        //Set coverDiv id to "cover"
        coverDiv.setAttribute('id', 'cover');
        coverDiv.setAttribute('class', 'promptClose');
        coverDiv.style.position = 'fixed'

        //Add event listener to password icon
        pd.addEventListener('click', () => {
            if(pd.src === 'http://localhost:8000/icons/closedEye.png') {

                //Show the password confirmation prompt
                getElement('passwordPromptDiv').style.transform = 'scale(1)';

                //Add coverDiv to body
                document.body.appendChild(coverDiv);

                const removeCoverDiv = () => { eval("try{getElement('cover').remove()}catch{};getElement('passwordPromptDiv').style.transform='scale(0)';", "return;") }

                //Add event listener to close button and coverDiv      
                getElement('passwordClose').addEventListener('click', removeCoverDiv);
                coverDiv.addEventListener('click', removeCoverDiv);

                //Check if confirm button is clicked
                getElement('promptButton').addEventListener('click', (e) => {
                    e.preventDefault();
                    require('utils/confirm/confirmPassword')(decryptPassword, pd, coverDiv)
                });
            } else { //If eye image is open, change to closed and hide password
                pd.setAttribute('src', './icons/closedEye.png');
                getElement('Passwd').setAttribute('type', 'password');
                return;
            }

            
        });
    } else { //No user
        //Shorten the size of userData box
        getElement('userData').style.height = 'calc(400 / 800 * 100%)';
   }
});

// Load styles
require('styles/lgnregBox.scss'), require('styles/profile.scss'), require('styles/nav.scss')