import firebase from 'firebase';
import auth from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBxqB57ZmTbMbc-P1w48XEpirJ021eOsb4',
  authDomain: 'myfirstfirebase-5a188.firebaseapp.com',
  databaseURL: 'https://myfirstfirebase-5a188.firebaseio.com',
  projectId: 'myfirstfirebase-5a188',
  storageBucket: 'myfirstfirebase-5a188.appspot.com',
  messagingSenderId: '738346962097',
  appId: '1:738346962097:web:d6befce02b5438ee0da690',
  measurementId: 'G-YYF2T7C766',
};

try {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
} catch (err) {
  console.log('Firebase initialized: ', err);
}

export { firebase, auth };
