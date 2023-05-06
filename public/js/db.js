// enable offline data
const firestoreDBName = "IPL";
import { getFirestore, collection, query, where, onSnapshot, getDocs, doc, setDoc, addDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
const db = getFirestore();

// window.db.enablePersistence()
//   .catch(function(err) {
//     if (err.code == 'failed-precondition') {
//       // probably multible tabs open at once
//       console.log('persistance failed');
//     } else if (err.code == 'unimplemented') {
//       // lack of browser support for the feature
//       console.log('persistance not available');
//     }
//   });

// real-time listener
const q = query(collection(db, firestoreDBName));
const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach(change => {
        if(change.type === 'added'){
          renderRecipe(change.doc.data(), change.doc.id);
        }

        if(change.type === 'removed'){
          removeRecipe(change.doc.id);
        }
    })
})


// add new recipe
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
  evt.preventDefault();
  
  const playersSet = {
    player_1: form.player_1.value,
    player_2: form.player_2.value,
    player_3: form.player_3.value
  };

  var currentdate = new Date(); 
  var datetime = currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

  // const docRef = addDoc(collection(db, firestoreDBName), playersSet);  
  setDoc(doc(db, "IPL", datetime), playersSet);

  form.player_1.value = '';
  form.player_2.value = '';
  form.player_3.value = '';
});

// remove a recipe
const recipeContainer = document.querySelector('.recipes');
recipeContainer.addEventListener('click', evt => {
  console.log(evt);
  if(evt.target.id === 'delete'){
    const id = evt.target.getAttribute('data-id');
    deleteDoc(doc(db, firestoreDBName, id));
  }
  else if(evt.target.id === 'edit'){
    alert('Edit not yet implemented');
  }
})