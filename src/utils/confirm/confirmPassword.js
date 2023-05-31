module.exports = function(decryptPassword, pd, coverDiv) {
    const getElement = require('utils/shorten/getElement')
    decryptPassword.then((password) => {
        //If user confirms with correct password, display password and show open eye
        if (getElement('passwordPrompt').value == password) {
            //Show password and set eye image to open
            pd.setAttribute('src', '/icons/openEye.png');
            getElement('Passwd').setAttribute('type', 'text');

            //Remove password prompt
            coverDiv.remove();
            getElement('passwordPromptDiv').style.transform = 'scale(0)';

            return;
        } else { //If user confirms with incorrect password, display error 
            //Make box bigger to display error message
            getElement('passwordPromptDiv').style.height = '125px'
            getElement('promptMessage').innerHTML = 'Incorrect Password'

            //Shake box
            require('error/shake')(getElement('passwordPrompt'))
        }
    });
}