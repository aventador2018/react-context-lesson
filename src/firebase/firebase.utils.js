import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBar2bUo8oHC_Ydn3R2xdRyaLRQ_fCaX_k",
  authDomain: "crwn-db-256bb.firebaseapp.com",
  databaseURL: "https://crwn-db-256bb.firebaseio.com",
  projectId: "crwn-db-256bb",
  storageBucket: "crwn-db-256bb.appspot.com",
  messagingSenderId: "775892862033",
  appId: "1:775892862033:web:8a81f70e8bf0848aa92470",
  measurementId: "G-JXQTQZRYVH"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
