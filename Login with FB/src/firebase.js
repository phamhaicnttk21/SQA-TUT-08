// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApLkjHkJ1BlhxxkXKgD1_wz9dGiEXH_38",
  authDomain: "authentication-with-fire-7b115.firebaseapp.com",
  projectId: "authentication-with-fire-7b115",
  storageBucket: "authentication-with-fire-7b115.appspot.com",
  messagingSenderId: "696760062775",
  appId: "1:696760062775:web:c746c57705847eeedc80b2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export default app;
