const auth = require('@firebase/auth')
module.exports = {
    getAuth: auth.getAuth,
    signOut: auth.signOut,
    updateProfile: auth.updateProfile,
    onAuthStateChanged: auth.onAuthStateChanged,
    signInWithEmailAndPassword: auth.signInWithEmailAndPassword,
    createUserWithEmailAndPassword: auth.createUserWithEmailAndPassword
}