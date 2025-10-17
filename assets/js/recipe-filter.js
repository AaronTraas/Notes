document.addEventListener('DOMContentLoaded', (event) => {
  const filter_category = document.getElementById('category-filter');
  const filter_favorite = document.getElementById('favorite-filter');
  const ingredient_checkboxes = document.querySelectorAll('#ingredient-filter input.multi-select-option');
  const recipes = document.querySelectorAll('.recipe-link');

  function handleHashChange(firstTime = false) {
    const params = new URLSearchParams(window.location.hash.slice(1));
    var classes = []

    if (params.has('category')) {
      classes.push('category-' + params.get('category'))
      if (firstTime) {
        filter_category.value = params.get('category')
      }
    }
    if (params.has('favorite')) {
      classes.push('favorite-' + params.get('favorite'))
      if (firstTime) {
        filter_favorite.value = params.get('favorite')
      }
    }
    if (params.has('ingredients')) {
      const ingredients = params.get('ingredients').split('|')
      classes = classes.concat(ingredients.map(str => 'ingredient-' + str))
      if (firstTime) {
        for (const checkbox of ingredient_checkboxes) {
          // Check if the checkbox's value is in the array of values to select
          if (ingredients.includes(checkbox.value)) {
            checkbox.checked = true; // Set the checkbox as checked
          } else {
            checkbox.checked = false; // Set the checkbox as unchecked
          }
        }
      }
    }

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

    if (filter_category) {
      if (filter_category.value == 'all') {
        params.delete('category')
      } else {
        params.set('category', filter_category.value)
      }
    }

    if (filter_favorite) {
      if (filter_favorite.value == 'all') {
        params.delete('favorite')
      } else {
        params.set('favorite', filter_favorite.value)
      }
    }

    const selected_ingredients = []
    for (const cb of ingredient_checkboxes) {
      if (cb.checked) {
        selected_ingredients.push(cb.value)
      }
    }

    if (selected_ingredients.length == 0) {
      params.delete('ingredients')
    } else {
      params.set('ingredients', selected_ingredients.join('|'))
    }

    window.location.hash = '#' + params.toString()
  }

  if (filter_category) {
    filter_category.addEventListener('change', filter)
  }
  if (filter_favorite) {
    filter_favorite.addEventListener('change', filter)
  }
  ingredient_checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filter)
  });

  window.addEventListener("hashchange", handleHashChange);

  handleHashChange(true)
})
