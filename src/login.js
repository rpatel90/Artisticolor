require('./init-fb').init();

onAuthStateChanged(auth, (user) => {
    if(user) {
        console.log(user);
        user.photoURL = 'http://127.0.0.1:5500/icons/usercon.png';

        //Create element to display user username
        const aElement = document.createElement('a');
        aElement.setAttribute('id', 'displayName');
        aElement.classList.add('userDisplay');
        
        //Display user display name
        document.getElementById('lgnButton').remove();
        aElement.innerHTML = user.displayName + '<img src="/icons/dropdown-arrow.png" id="dropdown-arrow" height="20px">';
        document.getElementById('navigation').appendChild(aElement);

        //Close login window
        document.getElementById('close').click();

        //If userdata box exists then shorten height of userData box
        if(document.getElementById('userData')) {
            document.getElementById('userData').style.height = 'calc(var(--accBoxHeight) / 800 * 100%)';
        }
    } else {
        document.getElementById('sub-menu-wrap').style.display = 'none'
        //Sign in user when login button is pressed
        document.getElementById('login-box').style.transform = 'scale(0)';

        //If login button pressed then login the user
        document.getElementById('login').addEventListener('click', (e) => {
            e.preventDefault();
            
            //Get the email and password input boxes
            const email = document.getElementById('email');
            const password = document.getElementById('password');

            //If entered values are blank, end the function
            if(email == '' || password == '') {
                return;
            }

            //Login user
            signInWithEmailAndPassword(auth, email.value, password.value).then(() => {
                //Close login window
                document.getElementById('close').click();
            }).catch((error) => {
                //Shake input boxes
                email.classList.add('error');
                password.classList.add('error');
                setTimeout(() => {
                    email.classList.remove('error');
                    password.classList.remove('error');
                }, 500);

                //Display error message
                document.getElementById('message').innerHTML = 'Invalid email or password';

                if(error.code = 'auth/user-not-found') {
                    document.getElementById('message').innerHTML = 'Invalid email or password';
                    return;
                }
            });
        });
    }
});

