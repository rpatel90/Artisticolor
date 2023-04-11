//import * as fb from './firebaseConfig.js'

document.getElementById('logout').addEventListener('click', function() {
    //Sign out user
    fb.auth.signOut().then(() => {        
        location.href = 'home.html'
    })
});

const CryptoJS = require('crypto-js')

fb.Auth.onAuthStateChanged(fb.auth, (user) => {
    if(user) {
        document.getElementById('aEmail').value = user.email;
        document.getElementById('aUsername').value = user.displayName;
        
        fb.get(fb.child(fb.databaseRef, `Users/${user.uid}/Password`)).then((pwd) => {
            const decrypted = CryptoJS.AES.decrypt(pwd._node.value_, 'sha-256')
            const passwdDisplay = decrypted.toString(CryptoJS.enc.Utf8)
            document.getElementById('aPasswd').value = passwdDisplay;
        });

        const pd = document.getElementById('pdIcon');
        const coverDiv = document.createElement('div');
        coverDiv.setAttribute('id', 'cover');

        pd.addEventListener('click', (e) => {
            if(pd.src == 'http://127.0.0.1:5500/icons/closedEye.png') {
                
                document.getElementById('passwordPromptDiv').style.transform = 'scale(1)';
                
                document.body.appendChild(coverDiv);

                document.getElementById('passwordClose').addEventListener('click', (e) => {
                    coverDiv.remove();
                    document.getElementById('passwordPromptDiv').style.transform = 'scale(0)';
                    return;
                });

                document.getElementById('promptButton').addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    fb.get(fb.child(fb.databaseRef, `Users/${user.uid}/Password`)).then((passwd) => {
                        if(document.getElementById('passwordPrompt').value == document.getElementById('aPasswd').value) {
                            pd.setAttribute('src', '../icons/openEye.png');
                            document.getElementById('aPasswd').setAttribute('type', 'text');
                            
                            coverDiv.remove();
                            document.getElementById('passwordPromptDiv').style.transform = 'scale(0)';
                            
                            return;
                        } else {
                            document.getElementById('passwordPromptDiv').style.height = '125px'
                            document.getElementById('promptMessage').innerHTML = 'Incorrect Password'
    
                            document.getElementById('passwordPrompt').classList.add('error')
                            setTimeout(function() {
                                document.getElementById('passwordPrompt').classList.remove('error');
                            }, 500)
                        }
                    });
                });

            }
            setTimeout((e) => {
                if(pd.src == 'http://127.0.0.1:5500/icons/openEye.png') {
                    pd.setAttribute('src', '../icons/closedEye.png');
                    document.getElementById('aPasswd').setAttribute('type', 'password')
                    return;
                }
            }, 100)
            
        });
    } else {
        
    }
});