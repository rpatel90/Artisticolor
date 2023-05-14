module.exports = function(decryptPassword, pd, coverDiv) {
    decryptPassword.then((password) => {
        //If user confirms with correct password, display password and show open eye
        if (document.getElementById('passwordPrompt').value == password) {
            //Show password and set eye image to open
            pd.setAttribute('src', '../icons/openEye.png');
            document.getElementById('Passwd').setAttribute('type', 'text');

            //Remove password prompt
            coverDiv.remove();
            document.getElementById('passwordPromptDiv').style.transform = 'scale(0)';

            return;
        } else { //If user confirms with incorrect password, display error 
            //Make box bigger to display error message
            document.getElementById('passwordPromptDiv').style.height = '125px'
            document.getElementById('promptMessage').innerHTML = 'Incorrect Password'

            //Shake box
            require('error/shake')(document.getElementById('passwordPrompt'))
        }
    });
}