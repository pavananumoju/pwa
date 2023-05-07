import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

const auth = getAuth();

// const email = "pavan@cb.com";
// const password = "cbadmin";

const loginform = document.querySelector('.loginform');
loginform != null && 
loginform.addEventListener('submit', evt => {
    evt.preventDefault();
    const email = loginform.uname.value;
    const password = loginform.psw.value;
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        window.open('/index.html', '_self');
        
        
        
        // ...
      }) 
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error credentials');
        document.querySelector('#msgs').innerHTML = 'Invalid Credentials!'
      });
})


onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('user logged in');
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const email = user.email;
    console.log('user email - '+email);
    document.querySelector('#loggedinuser').innerHTML = email;
    // ...
  } else {
    // User is signed out
    // ...
  }
});



