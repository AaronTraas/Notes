document.addEventListener('DOMContentLoaded', (event) => {
  const ingredient_checkboxes = document.querySelectorAll('#ingredient-filter .multi-select-options input[type="checkbox"]');
  const recipes = document.querySelectorAll('.recipe-link');

  function hideFilteredRecipes(classes) {
    recipes.forEach(function(recipe) {
      recipe.dataset.hide = false
      for (classname of classes) {
        if (!recipe.classList.contains(classname)) {
          recipe.dataset.hide = true
          continue
        }
      }
    })
  }

  const filter = function filter() {
    const selected_ingredients = []
    for (const cb of ingredient_checkboxes) {
      if (cb.checked) {
        selected_ingredients.push('.ingredient-' + cb.value)
      }
    }

    const selected_ingredients_selector = selected_ingredients.join('')

    for (const recipe of recipes) {
      recipe.dataset.hide = false
      if (selected_ingredients_selector != '' && !recipe.matches(selected_ingredients_selector)) {
        recipe.dataset.hide = true
      }
    }
  }

  ingredient_checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filter)
  });
})
