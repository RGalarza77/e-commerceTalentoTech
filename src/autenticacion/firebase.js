// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

//registrar nuevo usuario con email
export function crearUsuario(email, password) {
  return (
    new Promise((res, rej) => {

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
          console.log(error.code);
          const errorCode = error.code;
          const errorMessage = error.message;
          rej(error);
          // ..
        });
    })
  )
}

//login con email y contraseña
export function logearseConEmail(email, password) {
  return (
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

/*Autenticarse con Gmail*/

const providerGmail = new GoogleAuthProvider();

auth.useDeviceLanguage(); //utilizar el idioma por defecto de la pc
export function logearseConGmail() {

  return signInWithPopup(auth, providerGmail)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      return user;
    })
    .catch((error) => {
      console.error('Error al iniciar sesión con Google:', error.message);
      throw error; 
    });

}
