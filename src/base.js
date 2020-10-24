import * as firebase from "firebase/app"
require("firebase/auth")


const app = firebase.initializeApp({
  apiKey: "AIzaSyCjLnX01NVTDAI5wNK08u35XAlxejuHfII",
    authDomain: "facegenie-c6cb6.firebaseapp.com",
    databaseURL: "https://facegenie-c6cb6.firebaseio.com",
    projectId: "facegenie-c6cb6",
    storageBucket: "facegenie-c6cb6.appspot.com",
    messagingSenderId: "591521915362",
    appId: "1:591521915362:web:e88dc8e693605dda3559bb",
    measurementId: "G-YGRS5V8XGB"
});

export default app