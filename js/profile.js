import { //Firebase variables
	firebaseConfig,
	app,
	database,
	databaseRef,
	auth,
} from './firebaseConfig.js';
import { // Firebase functions
	initializeApp,
    getDatabase,
    ref,
    set,
    get,
    child,
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from './firebaseConfig.js';

document.getElementById('logout').addEventListener('click', function() {
    //Sign out user
    auth.signOut().then(() => {        
        location.href = 'home.html'
    })
});

onAuthStateChanged(auth, (user) => {
    if(user) {
        document.getElementById('aEmail').value = user.email;
        document.getElementById('aUsername').value = user.displayName;
        
        get(child(databaseRef, `Users/${user.uid}/Password`)).then((pwd) => {
            const passwd = pwd._node.value_
            document.getElementById('aPasswd').value = passwd;
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
                    
                    get(child(databaseRef, `Users/${user.uid}/Password`)).then((passwd) => {
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