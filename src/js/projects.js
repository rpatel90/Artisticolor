require('./init-fb').init();

document.getElementById('makeProjectBtn').addEventListener('click', () => {
    console.log('Hello World')
});

//Load styles
const lgnregBox = require('../styles/lgnregBox.css'),
    nav = require('../styles/nav.css'),
    projects = require('../styles/projects.css')