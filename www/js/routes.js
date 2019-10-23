document.body.addEventListener('click', e => {
  //need functionality for showing one contact

  let a = e.target.closest('a[href^="/"]');
  if (a) {
    window.history.pushState(null, null, a.getAttribute('href'));
    e.preventDefault();
    reactOnRoute();
  }
});

function reactOnRoute() {
  if (location.pathname.match(/\/contact\/\d{1,}/g)) {
    // show contact
    let id = location.pathname.split('/contact/')[1];
    let contactToShow = contacts.filter(x => x.id === id)[0];

    //how to put this on screen??
    console.log('Now show the contact', contactToShow);
  }
  else {
    // not a contact detail so restore normal list view
    console.log('Restore list view');
  }
}

// listen on forward/back
window.addEventListener('popstate', reactOnRoute);

// run on initial hard page load
reactOnRoute();