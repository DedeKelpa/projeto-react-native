import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDvyB09sOBKEH6-0EivW9xW5hVtK0ZHSXg",
  authDomain: "projeto--gerenciamento-habitos.firebaseapp.com",
  databaseURL: "https://projeto--gerenciamento-habitos-default-rtdb.firebaseio.com",
  projectId: "projeto--gerenciamento-habitos",
  storageBucket: "projeto--gerenciamento-habitos.firebasestorage.app",
  messagingSenderId: "362207572860",
  appId: "1:362207572860:web:caf07e40bd9cca71e2eaf9"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const database = firebase.database();
export default firebase;
