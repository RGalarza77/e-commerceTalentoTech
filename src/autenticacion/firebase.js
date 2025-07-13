// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtLqpbLEc00uXB2I_u2_J0goOADU6_gcE",
  authDomain: "e-commerce-d7cd8.firebaseapp.com",
  projectId: "e-commerce-d7cd8",
  storageBucket: "e-commerce-d7cd8.firebasestorage.app",
  messagingSenderId: "460135626775",
  appId: "1:460135626775:web:4f96020128f50129330452"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

//registrar nuevo usuario con email
export function crearUsuario(email, password){
    return(
        new Promise ((res, rej) => {
            
            createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed up 
                console.log("Credenciales: ", userCredential)
                const user = userCredential.user;
                console.log(user);
                res(user);
                // ...
              })
              .catch((error) => {
                console.log(error);
                const errorCode = error.code;
                const errorMessage = error.message;
                rej(error);
                // ..
              });
        })
    )
}

//login con email y contraseña
export function logearseConEmail(email, password){
    return(
        new Promise((res, rej) => { //res = resuelto, rej = rechazado

            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed in 
                console.log("Credenciales: ", userCredential)
                const user = userCredential.user;
                console.log(user)
                res(user) //la promesa fue resuelta y devuelve 'user'
              })
              .catch((error) => {
                console.log(error)
                const errorCode = error.code;
                const errorMessage = error.message;
                rej(error)//la promesa fue rechazada y devuelve 'error'
              });
        })
    )

}