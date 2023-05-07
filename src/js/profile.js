require('./init-fb').init();

//Load crypto library
const CryptoJS = require('crypto-js');

onAuthStateChanged(auth, (user) => {
    if(user) { //User is logged in
        //Sign out user from account
        document.getElementById('logout').addEventListener('click', () => {
            signOut(auth).then(location.href = '../index.html');
        });
        
        //Get and return user password and decryption key
        async function getPassword() {
            return [
                (await get(ref(db, `Users/${user.uid}/Password`))).val(),
                (await get(ref(db, `Users/${user.uid}/Key`))).val()
            ]
        }

        //Decrypt user password
        const decryptPassword = getPassword().then((data) => {
            return require('../utils/crypto/decrypt')(data[0], data[1]);
        });

        decryptPassword.then(pwd => document.getElementById('Passwd').value = pwd );
        
        //Create img element to display user profile photo 
        const imgEl = document.createElement('img');
        imgEl.setAttribute('id', 'profilePhoto');
        imgEl.setAttribute('src', user.photoURL);
        document.getElementById('header').appendChild(imgEl);

        //Display username and email
        document.getElementById('Email').value = user.email;
        document.getElementById('Username').value = user.displayName;

        //Get password icon element
        const pd = document.getElementById('pdIcon');

        //Create a div to cover the page when user is prompted to enter password
        const coverDiv = document.createElement('div');

        //Set coverDiv id to "cover"
        coverDiv.setAttribute('id', 'cover');
        coverDiv.setAttribute('class', 'promptClose');

        //Add event listener to password icon
        pd.addEventListener('click', () => {
            if (pd.src === 'http://localhost:8000/icons/closedEye.png') {

            //Show the password confirmation prompt
                document.getElementById('passwordPromptDiv').style.transform = 'scale(1)';

                //Add coverDiv to body
                document.body.appendChild(coverDiv);

                const removeCoverDiv = () => { eval("try{document.getElementById('cover').remove()}catch{};document.getElementById('passwordPromptDiv').style.transform='scale(0)';", "return;") }

                //Add event listener to close button and coverDiv      
                document.getElementById('passwordClose').addEventListener('click', removeCoverDiv);
                coverDiv.addEventListener('click', removeCoverDiv);

                //Check if confirm button is clicked
                document.getElementById('promptButton').addEventListener('click', (e) => {
                    e.preventDefault();

                    //Check if password
                    decryptPassword.then((password) => {
                        //If user confirms with correct password, display password and show open eye
                        if(document.getElementById('passwordPrompt').value == password) {
                            //Show password and set eye image to open
                            pd.setAttribute('src', '../icons/openEye.png');
                            document.getElementById('Passwd').setAttribute('type', 'text');

                            //Remove password prompt
                            coverDiv.remove();
                            document.getElementById('passwordPromptDiv').style.transform = 'scale(0)';

                            return;
                        } else { //If user confirms with incorrect password, shake box and display error 
                            //Make box bigger to display error message
                            document.getElementById('passwordPromptDiv').style.height = '125px'
                            document.getElementById('promptMessage').innerHTML = 'Incorrect Password'

                            //Shake box
                            document.getElementById('passwordPrompt').classList.add('error');
                            setTimeout(document.getElementById('passwordPrompt').classList.remove('error'), 500)
                        }
                    });
                });
            }
            setTimeout(() => {
                //If eye image is open, change to closed and hide password
                if(pd.src == 'http://localhost:8000/icons/openEye.png') {
                    pd.setAttribute('src', '../icons/closedEye.png');
                    document.getElementById('Passwd').setAttribute('type', 'password')
                    return;
                }
            }, 100)
        });
    } else { //No user
        //Shorten the size of userData box
        document.getElementById('userData').style.height = 'calc(400 / 800 * 100%)';
    }
});

//Load styles
const lgnregBox = require('styles/lgnregBox.css'),
    nav = require('styles/nav.css'),
    profile = require('styles/profile.css')