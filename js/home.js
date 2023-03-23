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

