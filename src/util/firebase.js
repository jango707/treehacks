import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDFC4kKDoALBRJchkXL3Mb6YPzhjajN_oM",
    authDomain: "treehacks-bed0c.firebaseapp.com",
    databaseURL: "https://treehacks-bed0c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "treehacks-bed0c",
    storageBucket: "treehacks-bed0c.appspot.com",
    messagingSenderId: "500099926048",
    appId: "1:500099926048:web:acffd4cbf51ef600b4d445",
    measurementId: "G-T1604DBK6S"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;