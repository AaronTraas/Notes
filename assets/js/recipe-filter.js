document.addEventListener('DOMContentLoaded', (event) => {
  const filter_category = document.getElementById('category-filter');
  const filter_author = document.getElementById('author-filter');
  const filter_favorite = document.getElementById('favorite-filter');
  const filter_season = document.getElementById('season-filter');
  const favorite_checkboxes = document.querySelectorAll('#favorite-filter input.multi-select-option');
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
    if (params.has('author')) {
      classes.push('author-' + params.get('author'))
      if (firstTime) {
        filter_author.value = params.get('author')
      }
    }
    if (params.has('season')) {
      classes.push('season-' + params.get('season'))
      if (firstTime) {
        filter_season.value = params.get('season')
      }
    }
    if (params.has('favorite')) {
      const favorite = params.get('favorite').split('|')
      classes = classes.concat(favorite.map(str => 'favorite-' + str))
      if (firstTime) {
        for (const checkbox of favorite_checkboxes) {
          // Check if the checkbox's value is in the array of values to select
          if (favorite.includes(checkbox.value)) {
            checkbox.checked = true; // Set the checkbox as checked
          } else {
            checkbox.checked = false; // Set the checkbox as unchecked
          }
        }
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

    if (filter_author) {
      if (filter_author.value == 'all') {
        params.delete('author')
      } else {
        params.set('author', filter_author.value)
      }
    }

    if (filter_season) {
      if (filter_season.value == 'all') {
        params.delete('season')
      } else {
        params.set('season', filter_season.value)
      }
    }

    const selected_favorites = []
    for (const cb of favorite_checkboxes) {
      if (cb.checked) {
        selected_favorites.push(cb.value)
      }
    }
    if (selected_favorites.length == 0) {
      params.delete('favorite')
    } else {
      params.set('favorite', selected_favorites.join('|'))
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
  if (filter_season) {
    filter_season.addEventListener('change', filter)
  }
  if (filter_author) {
    filter_author.addEventListener('change', filter)
  }
  favorite_checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filter)
  });
  ingredient_checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filter)
  });

  window.addEventListener("hashchange", handleHashChange);

  handleHashChange(true)
})
