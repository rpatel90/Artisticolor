require('./init-fb').init();
const CryptoJS = require('crypto-js');
    
onAuthStateChanged(auth, (user) => {
    if(user) { //User is logged in
        //Decrypt user password from database and to display
        get(child(database, `Users/${user.uid}/Password`)).then((pwd) => {
            get(child(database, `Users/${user.uid}/Key`)).then((key) => {
                //Decrypt password
                const KEY = key.val();
                const decrypted = CryptoJS.AES.decrypt(pwd.val(), KEY)
                const passwdDisplay = decrypted.toString(CryptoJS.enc.Utf8)
    
                //Display password
                document.getElementById('aPasswd').value = passwdDisplay;
            }); 
        });
        
        //Sign user out from account if Log out button pressed
        document.getElementById('logout').addEventListener('click', () => {
            signOut(auth).then(() => { location.href = 'home.html' });
        });

        //Create img element to display user profile photo 
        const imgEl = document.createElement('img');
        imgEl.setAttribute('id', 'profilePhoto');
        imgEl.setAttribute('src', user.photoURL);
        imgEl.style.height = '130px';
        imgEl.style.width = '130px';
        imgEl.style.margin = 'auto';
        imgEl.style.marginBottom = '-40px';
        document.getElementById('header').appendChild(imgEl); 

        //Display username and email
        document.getElementById('aEmail').value = user.email;
        document.getElementById('aUsername').value = user.displayName;

        //Get password icon element
        const pd = document.getElementById('pdIcon');

        //Create a div to cover the page when user is prompted to enter password
        const coverDiv = document.createElement('div');

        //Set coverDiv id to "cover"
        coverDiv.setAttribute('id', 'cover');
        coverDiv.setAttribute('class', 'promptClose');

        //Add event listener to password icon
        pd.addEventListener('click', (e) => {
            if(pd.src == 'http://127.0.0.1:5500/icons/closedEye.png') {

                //Show the password confirmation prompt
                document.getElementById('passwordPromptDiv').style.transform = 'scale(1)';
                //Add coverDiv to body
                document.body.appendChild(coverDiv);

                //Add event listener to close button and coverDiv
                document.getElementById('passwordClose').addEventListener('click', () => {
                    //Close the prompt and remove coverDiv from body
                    try { document.getElementById('cover').remove() } catch {}
                    
                    document.getElementById('passwordPromptDiv').style.transform = 'scale(0)';
                    return;
                });
                coverDiv.addEventListener('click', () => {
                    //Close the prompt and remove coverDiv from body
                    try { document.getElementById('cover').remove() } catch {}
                    document.getElementById('passwordPromptDiv').style.transform = 'scale(0)';
                    return;
                });

                //Check if confirm button is clicked
                document.getElementById('promptButton').addEventListener('click', (e) => {
                    //Stop page refresh
                    e.preventDefault();

                    //Check if password
                    get(child(database, `Users/${user.uid}/Password`)).then(() => {
                        //If user confirms with correct password, display password and show open eye
                        if (document.getElementById('passwordPrompt').value == document.getElementById('aPasswd').value) {
                            //Show password and set eye image to open
                            pd.setAttribute('src', '../icons/openEye.png');
                            document.getElementById('aPasswd').setAttribute('type', 'text');

                            //Remove password prompt
                            coverDiv.remove();
                            document.getElementById('passwordPromptDiv').style.transform = 'scale(0)';

                            return;
                        } else { //If user confirms with incorrect password, shake box and display error 
                            //Make box bigger to display error message
                            document.getElementById('passwordPromptDiv').style.height = '125px'
                            document.getElementById('promptMessage').innerHTML = 'Incorrect Password'

                            //Shake box
                            document.getElementById('passwordPrompt').classList.add('error')
                            setTimeout(function () {
                                document.getElementById('passwordPrompt').classList.remove('error');
                            }, 500)
                        }
                    });
                });
            }
            setTimeout((e) => {
                //If eye image is open, change to closed and hide password
                if (pd.src == 'http://127.0.0.1:5500/icons/openEye.png') {
                    pd.setAttribute('src', '../icons/closedEye.png');
                    document.getElementById('aPasswd').setAttribute('type', 'password')
                    return;
                }
            }, 100)
        });
    } else { //User not logged in
        document.getElementById('userData').style.height = 'calc(400 / 800 * 100%)';
    }
});