const {fetch} = window

// giving default categoryId and userId for demo purposes

  document.querySelector('#addDonation').addEventListener('click', e => {
    e.preventDefault()
    fetch('/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        itemName: document.querySelector('#itemName').value,
        quantity: 1,
        available: true,
        bought: false,
        price: document.querySelector('#price').value,
        categoryId: 3,
        // categoryId: parseInt(document.querySelector('#category').value)
        condition: document.querySelector('#condition').value,
        description: document.querySelector('#description').value,
        userId: 3
      })
    })
    // need to call repopulate userItems
    // getUserItems()
      .then(_ => {
        console.log('successful')
      })
      .catch(e => console.log(e))
  })

  // Activate Modal

  let getModal = document.querySelector('#modalOpen')
  let modal = document.querySelector('#myModal')
  let close = document.getElementsByClassName('modal-close')[0]

  getModal.addEventListener('click', e =>{
    modal.style.display = 'block'
  })
  close.addEventListener('click', e =>{
    modal.style.display = 'none'
  })

window.addEventListener('click', e =>{
  if(e.target.className === 'modal-background'){
    modal.style.display = 'none'
  }
})