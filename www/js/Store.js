let store
try{
  store = JSON.parse(localStorage.store) 
}
catch (e){
  store = {}
}

store.save = function(){
  localStorage.contacts = JSON.stringify(this)
}
store.contacts = store.contacts || []
store.save();

console.log(store);


// //this needs to be connected with ContactList and Contact
// //getAllContacts from localStorage
// //add(contact){return ??????}
// //save(contact) {return contact._id ? this.update(contact) : this.add(contact)}
// //remove
// //sort()
// //update 
