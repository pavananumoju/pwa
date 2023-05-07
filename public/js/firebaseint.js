    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
    import { getFirestore, query } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
    // Initialize Firebase
    const firebaseConfig = {
    apiKey: "AIzaSyBFT8UOJmIPOof8urDZ3ymADFav8l7N5YM",
    authDomain: "contacts-db-2dcb5.firebaseapp.com",
    projectId: "contacts-db-2dcb5",
    storageBucket: "contacts-db-2dcb5.appspot.com",
    messagingSenderId: "124645324248",
    appId: "1:124645324248:web:41d8b40fea0a4a90c66ead"
  };

    const app = initializeApp(firebaseConfig);