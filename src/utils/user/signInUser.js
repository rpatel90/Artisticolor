module.exports = function signIn(auth, email, password) {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then(() => require('utils/anim/login/box').close() )
        .catch(() => {
            //Shake input boxes
            require('error/shake')(email, password)
            
            //Display error message
            document.getElementById('message').innerHTML = 'Invalid email or password';
        });
}