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

        pd.addEventListener('click', (e) => {
            if(pd.src == 'http://127.0.0.1:5500/icons/closedEye.png') {
                
                document.getElementById('passwordPromptDiv').style.transform = 'scale(1)';
                //document.getElementById('passwordPromptDiv').style.boxShadow = '0 0 0 100vmax rgba(0,0,0,.3)';
                //document.getElementById('headBar').style.filter = 'brightness(70%)'
                
                const coverDiv = document.createElement('div');
                coverDiv.setAttribute('id', 'cover')
                //document.insertBefore(coverDiv, document.getElementsByTagName('header'));
                document.body.prepend(coverDiv)

                pd.setAttribute('src', '../icons/openEye.png');
                document.getElementById('aPasswd').setAttribute('type', 'text')

                return;
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