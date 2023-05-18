const recipes = document.querySelector('.recipes');

document.addEventListener('DOMContentLoaded', function () {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, { edge: 'right' });
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, { edge: 'left' });
});

const player1 = document.getElementById('player_1');
const player2 = document.getElementById('player_2');
const player3 = document.getElementById('player_3');
const submitBtn = document.getElementById('submitPlayersBtn');

const validateName = (name) => {
  const regexForName = /^[a-zA-Z\s]+$/;
  return regexForName.test(name);
}

const validatePlayers = () => {
  const player1Value = player1.value.trim();
  const player2Value = player2.value.trim();
  const player3Value = player3.value.trim();

  if (validateName(player1Value)) {
    document.getElementById('player_1_error').style.display = 'none';
  } else {
    document.getElementById('player_1_error').style.display = 'block';
  }

  if (validateName(player2Value)) {
    document.getElementById('player_2_error').style.display = 'none';
  } else {
    document.getElementById('player_2_error').style.display = 'block';
  }

  if (validateName(player3Value)) {
    document.getElementById('player_3_error').style.display = 'none';
  } else {
    document.getElementById('player_3_error').style.display = 'block';
  }

  if (validateName(player1Value) && validateName(player2Value) && validateName(player3Value)) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

player1.addEventListener('input', validatePlayers);
player2.addEventListener('input', validatePlayers);
player3.addEventListener('input', validatePlayers);


// render recipe data
const renderRecipe = (data, id) => {

  const html = `
    <div class="card-panel recipe white row" data-id="${id}">
      <img src="img/man.png" alt="recipe thumb">
      <div class="recipe-details">
        <div class="container">
            <span class="row recipe-title">
              <span class="col-sm">Player-1</span>
              <span class="col-sm"> : </span>
              <span class="col-sm">${data.player_1}</span>
            </span>
            <span class="row">
              <span class="col-sm">Player-2</span>
              <span class="col-sm"> : </span>
              <span class="col-sm">${data.player_2}</span>
            </span>
            <span class="row">
              <span class="col-sm">Player-3</span>
              <span class="col-sm"> : </span>
              <span class="col-sm">${data.player_3}</span>
            </span>
        </div>
      </div>
      <div class="recipe-edit">
        <i class="material-icons" data-id="${id}" id="edit">mode_edit_outline</i>
      </div>
      <div class="recipe-delete">
        <i class="material-icons" data-id="${id}" id="delete">delete_outline</i>
      </div>
    </div>
  `;
  recipes.innerHTML += html;

};

// remove recipe
const removeRecipe = (id) => {
  const recipe = document.querySelector(`.recipe[data-id='${id}']`);
  recipe.remove();
};




const getTeamData = (teamData) => {
  recipes.innerHTML = '';
    for (var i=1; i<teamData.length; i++) {
      // console.log('squadType: '+teamData[i].squadType);
      
      html = `
      <div class="card-panel team">
        <div class="container team">
            <pre>${doc.data().squadType}</pre>
        </div>
    </div>
  `;
  recipes.innerHTML += html;
   }
   document.querySelector('.add-btn').hide();
}



const getTeamDataFromSnapshot = (snapshot) => {
  recipes.innerHTML = '';

  snapshot.forEach((doc) => {
    // console.log('squadType: '+doc.data().squadType);
      
      html = `
    <div class="card-panel team">
        <div class="container team">
             <pre>${doc.data().squadType}</pre>
        </div>
    </div>
  `;
  recipes.innerHTML += html;
   });

   document.querySelector('.add-btn').hide();
}



