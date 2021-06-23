import firebase from 'firebase/app';

// Importa tudo o que você irá usar do firebase

import 'firebase/auth';
import 'firebase/database';

/*
  Configurações próprias do firebase,
  vindas de quando você cria um aplicação 
*/

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Inicializa o app

firebase.initializeApp(firebaseConfig);

// Inicializando as constantes que iremos usar no app

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database };