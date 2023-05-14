require('./init').init();

onAuthStateChanged(auth, (user) => {
    if(user) {
        console.log(user);

        user.photoURL = 'localhost:8000/icons/usercon.png';

        //Create element to display user username
        const aElement = document.createElement('a');
        aElement.setAttribute('id', 'displayName');
        aElement.classList.add('userDisplay');
        
        //Display user display name
        getElement('lgnButton').remove();
        aElement.innerHTML = user.displayName //+ '<img src="/icons/dropdown-arrow.png" id="dropdown-arrow" height="20px">';
        getElement('navigation').appendChild(aElement);

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
        require('anim/login/box').close();
        
        //Shorten height of userData box if it exists
        getElement('userData')?getElement('userData').style.height = 'calc(var(--accBoxHeight) / 800 * 100%)':null;
    } else {
        //Get the email and password input boxes
        const email = getElement('email');
        const password = getElement('password');

        //Sign in user when login button is pressed
        getElement('login-box').style.transform = 'scale(0)';

        //If login button pressed then login the user
        getElement('login').addEventListener('click', (e) => {
            e.preventDefault();
            require('utils/user/signInUser')(auth, email, password)
        });
    }
});

require('anim/login/box').addListeners()