require('./init').init();

getElement('makeProjectBtn').addEventListener('click', () => {
    console.log('Hello World')
});

//Load styles
require('../assets/styles/lgnregBox.scss'), require('../assets/styles/nav.scss'), require('../assets/styles/projects.scss')