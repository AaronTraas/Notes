document.addEventListener('DOMContentLoaded', (event) => {
  const filter_tag = document.getElementById('tag-filter');
  const filter_ingredient = document.getElementById('ingredient-filter');
  const recipes = document.querySelectorAll('.recipe-link');

  function handleHashChange() {
    const params = new URLSearchParams(window.location.hash.slice(1));
    var classes = []

    if (params.has('category')) {
      classes.push('category-' + params.get('category'))
    }
    if (params.has('tag')) {
      classes.push('tag-' + params.get('tag'))
    }
    if (params.has('ingredient')) {
      classes.push('ingredient-' + params.get('ingredient'))
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
    if (filter_tag.value == 'all') {
      params.delete('tag')
    } else {
      params.set('tag', filter_tag.value)
    }

    if (filter_ingredient.value == 'all') {
      params.delete('ingredient')
    } else {
      params.set('ingredient', filter_ingredient.value)
    }

    window.location.hash = '#' + params.toString()
  }

  filter_tag.addEventListener('change', filter)
  filter_ingredient.addEventListener('change', filter)

  window.addEventListener("hashchange", handleHashChange);

  handleHashChange()
})
