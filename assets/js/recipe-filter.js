document.addEventListener('DOMContentLoaded', (event) => {
  const filter_category = document.getElementById('category-filter');
  const ingredient_checkboxes = document.querySelectorAll('#ingredient-filter input.multi-select-option');
  const recipes = document.querySelectorAll('.recipe-link');

  function handleHashChange() {
    const params = new URLSearchParams(window.location.hash.slice(1));
    var classes = []

    if (params.has('category')) {
      classes.push('category-' + params.get('category'))
    }
    if (params.has('ingredients')) {
      const ingredients = params.get('ingredients').split('|')
      classes = classes.concat(ingredients)
    }

    console.log(classes)
    hideFilteredRecipes(classes)
  }

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
    const params = new URLSearchParams(window.location.hash.slice(1));

    if (filter_category.value == 'all') {
      params.delete('category')
    } else {
      params.set('category', filter_category.value)
    }


    const selected_ingredients = []
    for (const cb of ingredient_checkboxes) {
      if (cb.checked) {
        selected_ingredients.push('ingredient-' + cb.value)
      }
    }

    if (selected_ingredients.length == 0) {
      params.delete('ingredients')
    } else {
      params.set('ingredients', selected_ingredients.join('|'))
    }

    window.location.hash = '#' + params.toString()
  }

  filter_category.addEventListener('change', filter)
  ingredient_checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filter)
  });

  window.addEventListener("hashchange", handleHashChange);

  handleHashChange()
})
