import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDsV55IatKZfedWPwZcgtAVmXKV7gVhWjg",
  authDomain: "habitos-app-8702b.firebaseapp.com",
  databaseURL: "https://habitos-app-8702b-default-rtdb.firebaseio.com",
  projectId: "habitos-app-8702b",
  storageBucket: "habitos-app-8702b.firebasestorage.app",
  messagingSenderId: "266771518187",
  appId: "1:266771518187:web:246eba1cafc0abe2dd64ae",
  measurementId: "G-Y3MPDQRX8X"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export const database = firebase.database();
export default firebase;
