  document.addEventListener('DOMContentLoaded', (event) => {
    const hamburger_menu = document.getElementById('sidebar')
    const hamburger = document.getElementById('hamburger')
    const hamburger_close = document.getElementById('hamburger-close')

    hamburger.addEventListener('click', function(event) {
      hamburger_menu.dataset.active = true
      event.preventDefault()
    }, false)

    hamburger_close.addEventListener('click', function(event) {
      hamburger_menu.dataset.active = false
      event.preventDefault()
    }, false)
  })
