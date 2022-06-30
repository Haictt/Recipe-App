// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdEj3WcwLZk8GG_xeESqjScgzgCOf2XgY",
    authDomain: "recipe-app-18f2c.firebaseapp.com",
    projectId: "recipe-app-18f2c",
    storageBucket: "recipe-app-18f2c.appspot.com",
    messagingSenderId: "272062878327",
    appId: "1:272062878327:web:991a61326c1ca44926ec72"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}
const auth = firebase.auth()

export { auth };