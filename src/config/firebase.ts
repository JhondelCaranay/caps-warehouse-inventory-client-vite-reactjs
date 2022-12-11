// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// replace this config with your own firebase account
const firebaseConfig = {
	apiKey: "AIzaSyCDQePophIfxvHl-LxoayqVIR36YJ8RTBI",
	authDomain: "react-upload-file-75466.firebaseapp.com",
	projectId: "react-upload-file-75466",
	storageBucket: "react-upload-file-75466.appspot.com",
	messagingSenderId: "801759095577",
	appId: "1:801759095577:web:6d40b9f63530552fc57388",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
