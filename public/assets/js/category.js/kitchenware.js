const { fetch } = window

const getKitchenware = _ => {
  fetch('/items')
    .then(items => items.json())
    .then(items => {
      document.querySelector('#kitchenwareTiles').innerHTML = ``
      const kitchenwareItems = items.filter(data =>
        data.category.category === 'kitchenware')
      kitchenwareItems.forEach(({ id, itemName, quantity, available, bought, price, condition, description, user, category }) => {
        let kitchenwareDiv = document.createElement('div')
        if (available && !bought && quantity > 0) {
          kitchenwareDiv.innerHTML = `
            <div class="card">
              <div class="card-content">
                <p class="title">
                  ${itemName}
                </p>
                <p class="subtitle">
                  Number available: ${quantity}
                  Category: ${category.category}
                </p>
              </div>
              <footer class="card-footer">
                <a class="contact pure-button pure-button-primary" href="#" data-id="${id}">Contact Owner</a>
                <a class="hide pure-button" href="#">Not Interested</a>
              </footer>
            </div>
          `
          document.querySelector('#kitchenwareTiles').append(kitchenwareDiv)
        }
      })
    })
    .catch(e => console.error(e))
}

getKitchenware()

const getParent = event => {
  return event.target.closest(`div.card`)
}

document.addEventListener(`click`, event => {
  if (event.target.classList[0] === `hide`) {
    let parent = getParent(event)
    parent.style.display = "none"
  } else {
    if (event.target.classList[0] === `contact`) {
      document.querySelector(`#kitchenwareTiles`).innerHTML = ``
      fetch(`/items/${event.target.dataset.id}`)
        .then(item => item.json())
        .then(({ id, itemName, quantity, available, bought, price, condition, description, user, category }) => {
          let chosenDiv = document.createElement(`div`)
          chosenDiv.innerHTML = `
            <div class="card">
              <div class="card-content">
                <p class="title">
                  ${itemName}
                </p>
                <p class="subtitle">
                  Number available: ${quantity}
                  Category: ${category.category}
                  Contact email: ${user.email}
                </p>
              </div>
              <footer class="card-footer">
                <a class="contact pure-button pure-button-primary" href="#" data-id="${id}">Contact Owner</a>
                <a class="hide pure-button" href="#">Not Interested</a>
              </footer>
            </div>
          `
          document.querySelector('#kitchenwareTiles').append(chosenDiv)
        })
        .catch(e => console.error(e))
    }
  }
})