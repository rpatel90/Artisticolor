module.exports = {
    email: () => {
        document.getElementById('emailLabel').style.transform = 'translateY(-200%)';
        document.getElementById('emailLabel').style.transition = '0.25s';

        if (document.getElementById('username').value == '') {
            document.getElementById('usernameLabel').style.transform = 'translateY(-50%)';
        }
        if (document.getElementById('password').value == '') {
            document.getElementById('passwordLabel').style.transform = 'translateY(-50%)';
        }
    },
    username: () => {
        document.getElementById('usernameLabel').style.transform = 'translateY(-200%)';
        document.getElementById('usernameLabel').style.transition = '0.25s';

        if (document.getElementById('email').value == '') {
            document.getElementById('emailLabel').style.transform = 'translateY(-50%)';
        }
        if (document.getElementById('password').value == '') {
            document.getElementById('passwordLabel').style.transform = 'translateY(-50%)';
        }
    },
    password: () => {
        document.getElementById('passwordLabel').style.transform = 'translateY(-200%)';
        document.getElementById('passwordLabel').style.transition = '0.25s';

        if (document.getElementById('email').value == '') {
            document.getElementById('emailLabel').style.transform = 'translateY(-50%)';
        }
        if (document.getElementById('username').value == '') {
            document.getElementById('usernameLabel').style.transform = 'translateY(-50%)';
        }
    },
    addListeners: () => {
        email.addEventListener('focus', module.exports.email)
        username.addEventListener('focus', module.exports.username)
        password.addEventListener('focus', module.exports.password)
    }
}