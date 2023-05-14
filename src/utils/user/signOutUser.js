module.exports = (function() {
    document.getElementById('logout').addEventListener('click', () => {
        signOut(auth).then(location.href = 'index.html');
    });
})()