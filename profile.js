if(sessionStorage.getItem('Login?') != null) {
    
    let email = sessionStorage.getItem('Email');
    document.getElementById('email').value = email;

    let username = sessionStorage.getItem('Username');
    document.getElementById('username').value = username;

    let password = sessionStorage.getItem('Password');
    document.getElementById('passwd').value = password;
}