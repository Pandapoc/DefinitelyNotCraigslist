const { fetch } = window

const getClothes = _ => {
  fetch('/items')
    .then(items => items.json())
    .then(items => {
      document.querySelector('#clothesTiles').innerHTML = ``
      const clothesItems = items.filter(data =>
        data.category.category === 'clothing')
      clothesItems.forEach(({ id, itemName, quantity, available, bought, price, condition, description, user, category }) => {
        let clothesDiv = document.createElement('div')
        if (available && !bought && quantity > 0) {
          clothesDiv.innerHTML = `
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
          document.querySelector('#clothesTiles').append(clothesDiv)
        }
      })
    })
    .catch(e => console.error(e))
}

getClothes()

const getParent = event => {
  return event.target.closest(`div.card`)
}

document.addEventListener(`click`, event => {
  if (event.target.classList[0] === `hide`) {
    let parent = getParent(event)
    parent.style.display = "none"
  } else {
    if (event.target.classList[0] === `contact`) {
      document.querySelector(`#clothesTiles`).innerHTML = ``
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
          document.querySelector('#clothesTiles').append(chosenDiv)
        })
        .catch(e => console.error(e))
    }
  }
})