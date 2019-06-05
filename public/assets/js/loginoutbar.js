let loggedInUser = sessionStorage.getItem('id')

if (loggedInUser) {
  // make div/bar across visbile
  document.querySelector('#userLoggedIn').style.display = 'inline-block'
  document.querySelector('#hello').innerHTML = `Hello ${sessionStorage.getItem('name')}!`
  document.querySelector('#profileLink').style.display = 'inline-block'
} else if (loggedInUser === '' || !loggedInUser) {
  // display log in link
  document.querySelector('#userLoggingIn').style.display = 'inline-block'
  document.querySelector('#logout').style.display = 'none'
}
