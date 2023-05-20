module.exports = function(auth, email, username, password) {
    createUserWithEmailAndPassword(auth, email.value, password.value).then((userCredential) => {
        
        const user = userCredential.user;
        
        const KEY = require('../crypto/randomKey')();

        //Encrypt user data
        const encryptedData = require('../crypto/encrypt')([
            email.value,
            username.value,
            password.value,
        ], KEY)
        
        // Set user displayName and photoURL
        updateProfile(user, {
            displayName: username.value,
            photoURL: 'http://localhost:8000/icons/usercon.png'
        });

        // Add encrypted data to database along with key
        set(ref(db, `Users/${user.uid}`), {
            Username: encryptedData[0],
            Email: encryptedData[1],
            Password: encryptedData[2],
            Key: KEY
        });

        //Redirect
        location.href = '/'
    }).catch((error) => {
        const errorcode = error.code
        
        if(errorcode == 'auth/invalid-email') {
            message.innerHTML = 'Please enter a valid email';
            require('error/shake')(email)
        }
        if(errorcode == 'auth/email-already-in-use') {
            message.innerHTML = 'Email is currently in use'
            require('error/shake')(email)
        }
        if(errorcode == 'auth/weak-password') {
            message.innerHTML = 'Password should be at least 6 characters'
            require('error/shake')(password)
        }
    });
};