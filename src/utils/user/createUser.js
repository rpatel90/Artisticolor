module.exports = function createUser(auth, email, username, password) {
    createUserWithEmailAndPassword(auth, email.value, password.value).then((userCredential) => {
        
        const user = userCredential.user;
        
        const CryptoJS = require('crypto-js');
        const randomKey = require('./randomKey');

        const KEY = randomKey();
        
        //Encrypt user data
        const encryptedEmail = CryptoJS.AES.encrypt(email.value, KEY),
            encryptedUsername = CryptoJS.AES.encrypt(username.value, KEY),
            encryptedPassword = CryptoJS.AES.encrypt(password.value, KEY)

        // Set user displayName and photoURL
        updateProfile(user, {
            displayName: username.value,
            photoURL: 'http://localhost:8000/icons/usercon.png'
        });

        // Add encrypted data to database along with key
        set(ref(db, `Users/${user.uid}`), {
            Username: encryptedUsername.toString(),
            Email: encryptedEmail.toString(),
            Password: encryptedPassword.toString(),
            Key: KEY
        });

        //Redirect
        location.href = '/'
    }).catch((error) => {
        const errorcode = error.code

        if(errorcode == 'auth/invalid-email') {
            message.innerHTML = 'Please enter a valid email';

            email.classList.add('error');
            setTimeout(email.classList.remove('error'), 500);
        }
        if(errorcode == 'auth/email-already-in-use') message.innerHTML = 'Email is currently in use'
        if(errorcode == 'auth/weak-password') message.innerHTML = 'Password should be at least 6 characters'
    })
};