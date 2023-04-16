require('./init-fb').init();

onAuthStateChanged(auth, (user) => {
    if(user) {
        console.log(user);

        //Get header element
        const navBar = document.getElementById('navigation');

        //Create element to display user username
        const aElement = document.createElement('a');
        aElement.setAttribute('id', 'displayName');
        aElement.classList.add('userDisplay')
        
        //Display user display name
        document.getElementById('lgnButton').remove();
        aElement.textContent = user.displayName;
        navBar.appendChild(aElement);

        //Close login window
        const close = document.getElementById('close');
        close.click();

        //If userdata box exists then shorten height of userData box
        if(document.getElementById('userData')) {
            document.getElementById('userData').style.height = 'calc(var(--accBoxHeight) / 800 * 100%)';
        }
    } else {
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
                const close = document.getElementById('close');
                close.click();
            }).catch(() => {
                //Shake input boxes
                const loginInputs = document.getElementsByClassName('lgnBoxInput');
                loginInputs.classList.add('error');
                setTimeout(() => { loginInputs.classList.remove('error') }, 500);
                
                //Display error message
                document.getElementById('message').innerHTML = 'Invalid email or password';
            });
        });
    }
});

