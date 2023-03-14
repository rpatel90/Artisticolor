/*
if(document.cookie.indexOf('loggedIn') != -1) {
    
    Username = sessionStorage.getItem('Username');

    let navBar = document.getElementById('navigation');
    let btnElement = document.getElementById('lgnButton')
    let aElement = document.createElement('a');

    btnElement.remove();
    navBar.appendChild(aElement);
    aElement.innerHTML = sessionStorage.getItem('Username');
}*/

document.getElementById('lgnButton').addEventListener('click', (e) => {
    document.getElementById('wrapper').classList.add('popup');
    document.getElementById('message').innerHTML = '';
});
document.getElementById('close').addEventListener('click', (e) => {
    document.getElementById('wrapper').classList.remove('popup');
    document.getElementById('message').innerHTML = '';
});