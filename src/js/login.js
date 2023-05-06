require('./init-fb').init();

onAuthStateChanged(auth, (user) => {
    if(user) {
        console.log(user);
        
        user.photoURL = 'localhost:8000/icons/usercon.png';

        //Create element to display user username
        const aElement = document.createElement('a');
        aElement.setAttribute('id', 'displayName');
        aElement.classList.add('userDisplay');
        
        //Display user display name
        document.getElementById('lgnButton').remove();
        aElement.innerHTML = user.displayName //+ '<img src="/icons/dropdown-arrow.png" id="dropdown-arrow" height="20px">';
        document.getElementById('navigation').appendChild(aElement);

        aElement.innerHTML = user.displayName +`
        <div id="sub-menu-wrap" class="sub-menu-wrap">
            <div class="menu-link-wrap">
                <a href="" class="sub-menu-link dropdown_item-1" id="menu-item-1">
                    <img src="/icons/user.png" height="26px">
                    <p>Profile</p>
                    <img src="/icons/right-arrow.png" id="menu-img-1" class="right-arrow">
                </a>
                <a href="" class="sub-menu-link dropdown_item-2" id="menu-item-2">
                    <img src="/icons/gear.png" height="26px">
                    <p>Settings</p>
                    <img src="/icons/right-arrow.png" id="menu-img-2" class="right-arrow">
                </a>
                <a href="" class="sub-menu-link dropdown_item-3 " id="menu-item-3">
                    <img src="/icons/help.png" height="26px">
                    <p>Help</p>
                    <img src="/icons/right-arrow.png" id="menu-img-3" class="right-arrow">
                </a>
                <a href="" class="sub-menu-link dropdown_item-4" id="menu-item-4">
                    <img src="/icons/logout.png" height="23px" style="margin-left: 4px;">
                    <p>Logout</p>
                </a>
            </div>
        </div>
        `

        //Close login window
        const close = document.getElementById('close');
        close.click();

        //Shorten height of userData box if it exists
        if(document.getElementById('userData')) {
            document.getElementById('userData').style.height = 'calc(var(--accBoxHeight) / 800 * 100%)';
        };

        // //Control dropdown menu display
        // aElement.addEventListener('mouseover', () => { 
        //     document.getElementById('sub-menu-wrap').style.display = 'block';
        // });
        // aElement.addEventListener('mouseleave', () => {
        //     document.getElementById('sub-menu-wrap').style.display = 'none';
        // });
    } else {
        //document.getElementById('sub-menu-wrap').style.display = 'none'
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
            signInWithEmailAndPassword(auth, email.value, password.value)
                .then(() => { close.click() })
                .catch((error) => {
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