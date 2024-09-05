import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyC1KX1eK6Jr1f_xOf1MlXmlog6Y_H5jGlg",
    authDomain: "carx-ffda5.firebaseapp.com",
    projectId: "carx-ffda5",
    storageBucket: "carx-ffda5.appspot.com",
    messagingSenderId: "170587487094",
    appId: "1:170587487094:web:945ab40b32cfd5d0dc5857",
    measurementId: "G-DESCCL5KGD"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;