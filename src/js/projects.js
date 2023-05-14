require('./init').init();

getElement('makeProjectBtn').addEventListener('click', () => {
    console.log('Hello World')
});

//Load styles
const lgnregBox = require('../assets/styles/lgnregBox.css'),
    nav = require('../assets/styles/nav.css'),
    projects = require('../assets/styles/projects.css')