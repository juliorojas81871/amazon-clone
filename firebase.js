import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDEed7vJe5V0D-0eWlBpEi1dQHe5Ur96go",
  authDomain: "clone-751c4.firebaseapp.com",
  projectId: "clone-751c4",
  storageBucket: "clone-751c4.appspot.com",
  messagingSenderId: "719833768810",
  appId: "1:719833768810:web:8e42a724c7893bf21bbb13",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;