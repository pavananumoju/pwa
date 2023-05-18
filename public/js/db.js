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
const q = query(collection(db, firestoreDBName, "Squads", "SRH"));
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
  if(evt.target.id === 'delete'){
    const id = evt.target.getAttribute('data-id');
    deleteDoc(doc(db, firestoreDBName, id));
  }
  else if(evt.target.id === 'edit'){
    alert('Edit not yet implemented');
  }
})


const refreshData = document.querySelector('.refreshbtn');
refreshData.addEventListener('click', evt => {
  console.log('getting data using API method');
  getData();
  document.querySelector('.refreshbtn').disabled = true;
  console.log('refresh button disabled');
})


const unlockAPICall = document.querySelector('.unlock');
unlockAPICall.addEventListener('click', evt => {
  document.querySelector('.refreshbtn').disabled = false;
})



const getData = () => {
  console.log('getting data...');
  

  fetch('https://cricbuzz-cricket.p.rapidapi.com/series/v1/5945/squads/28579',
  {
    headers : { 
      'X-RapidAPI-Key':'e3a774ef7cmshbdc22cb0186c6b8p16fdbbjsn6a99a1ad3518',
      'X-RapidAPI-Host':'cricbuzz-cricket.p.rapidapi.com',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }

  }
  )
  .then(res => res.json())
  .then(data=>{ 
    // console.log(data); 
    for (var i=0; i<data.player.length; i++) {
      // console.log('name:['+i+']'+data.player[i].name);
      if(data.player[i].id != undefined){
        const playersSet = {
          player_1: data.player[i].id,
          player_2: data.player[i].name,
          player_3: data.player[i].role
        };
          setDoc(doc(db, "IPL", "Squads", "SRH", data.player[i].id), playersSet);
      }
      
   }
   
  })
  
}



//////////
// const teamsAPI = () => {
const teams = document.getElementById('teams');
teams.addEventListener('click', evt => {
  // console.log('Display teams!...');
  const querySnapshot = getDocs(collection(db, "Teams"))
  .then(querySnapshot => {
    // console.log('qs:'+querySnapshot);
    getTeamDataFromSnapshot(querySnapshot);
    return null;
 })


/*
  fetch('https://cricbuzz-cricket.p.rapidapi.com/series/v1/5945/squads',
  {
    headers : { 
      'X-RapidAPI-Key':'e3a774ef7cmshbdc22cb0186c6b8p16fdbbjsn6a99a1ad3518',
      'X-RapidAPI-Host':'cricbuzz-cricket.p.rapidapi.com',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }

  }
  )
  .then(res => res.json())
  .then(data=>{ 
    console.log(data.squads); 
    for (var i=1; i<data.squads.length; i++) {
      console.log('squadType: '+data.squads[i].squadType);
        const teamSet = {
          squadId: data.squads[i].squadId,
          teamId: data.squads[i].teamId,
          squadType: data.squads[i].squadType
        };
      setDoc(doc(db, "Teams", data.squads[i].teamId.toString()), teamSet);
   }
    getTeamData(data.squads);
  })
*/

});
// }