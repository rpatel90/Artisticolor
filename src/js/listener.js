// Open/close login-box
document.getElementById('lgnButton').addEventListener('click', function () {
    document.getElementById('login-box').style.transform = 'scale(1)';
});
document.getElementById('close').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-box').style.transform = 'scale(0)';
});

//Move the label up when the input box is selected
document.getElementById('email').addEventListener('focus', function () {
    document.getElementById('emailLabel').style.transform = 'translateY(-200%)';
    document.getElementById('emailLabel').style.transition = '0.25s';
    if (document.getElementById('password').value == '') {
        document.getElementById('passwordLabel').style.transform = 'translateY(-50%)';
    }
});
document.getElementById('password').addEventListener('focus', function () {
    document.getElementById('passwordLabel').style.transform = 'translateY(-200%)';
    document.getElementById('passwordLabel').style.transition = '0.25s';
    if (document.getElementById('email').value == '') {
        document.getElementById('emailLabel').style.transform = 'translateY(-50%)';
    }
});