function login() {
    
    //User login info
    let loginInfo = {
		email: "",
        password: ""
    };

    //Hashes User lgn info
	async function hashPassword(input) {
		const encoder = new TextEncoder();
		const data = encoder.encode(input);
		const hash = await crypto.subtle.digest('SHA-256', data);
		return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
	}
	
	//Add hashed login data to UserInfo.lgnInfo
	const em = document.getElementById('email').value;
	hashPassword(em).then(hash => {
		loginInfo.email = hash;
	});
	//Add hashed login data to UserInfo.lgnInfo
	const pw = document.getElementById('password').value;
	hashPassword(pw).then(hash => {
		loginInfo.password = hash;
	});

    setTimeout(function() {
		//Store localStorage length property
		const lsLength = localStorage.length;
        
        //Get message element
        let message = document.getElementById('message');

        //Get the email and password input boxes
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        //If there are no users, output "Incorrect email or password"
        if(localStorage.getItem('User0 Data') == null) {
            message.innerHTML = 'Incorrect email or password.';
                
            //Shake input boxes
            email.classList.add('error');
            password.classList.add('error');
            setTimeout(function() {
                email.classList.remove('error');
                password.classList.remove('error');
            }, 500);
                    
            //Stop all
            return;
        }

        //Check is user input match stored account data
        for(let i=0; i<lsLength; i++) {
            //Get the data of every single user
            let lgnvalidator = JSON.parse(localStorage.getItem('User'+i+' Data'));
            
            //If the entered email matches with the stored email
            if(loginInfo.email == lgnvalidator.lgnInfo.email) {
                //If entered password matches sotred password
                if(loginInfo.password == lgnvalidator.lgnInfo.password) {

                    //Get navigation and login button elements
                    let navBar = document.getElementById('navigation');
                    let btnElement = document.getElementById('lgnButton')
                    
                    //Create am, "a" element and set the link property to profile page
                    let aElement = document.createElement('a');
                    aElement.setAttribute('href', '../html/profile.html');
                    
                    //Replace login button with username
                    btnElement.remove();
                    navBar.appendChild(aElement);
                    aElement.innerHTML = lgnvalidator.lgnInfo.username;
                    document.getElementById('wrapper').classList.remove('popup');
                    message.innerHTML = '';

                    
                    
                    return;
                } else {
                    message.innerHTML = 'Incorrect email or password.';
                    
                    //Shake input boxes
                    email.classList.add('error');
                    password.classList.add('error');
                    setTimeout(function() {
                        email.classList.remove('error');
                        password.classList.remove('error');
                    }, 500);
                    
                    //Stop all
                    return;
                }
            } else {
                message.innerHTML = 'Incorrect email or password.';
                
                //Shake input boxes
                email.classList.add('error');
                password.classList.add('error');
                setTimeout(function() {
                    email.classList.remove('error');
                    password.classList.remove('error');
                }, 500);

                //Stop all
                return;
            }
        }
    }, 10);
};