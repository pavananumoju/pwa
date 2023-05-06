const recipes = document.querySelector('.recipes');

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

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