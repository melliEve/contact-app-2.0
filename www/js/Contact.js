class Contact {
  constructor(name, phone, email) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.history = [];
    //this.createId();
  }
}

let contact = {
  id: createId(),
  name: '',
  phone: '',
  email: '',
  history: [],
};

function createId() {
  return (Math.random() + '').split('.')[1];
}

//addToList/save(){} with modal
//removeFromList/delete(){}
//showOneContact(){} --> with route
//showHistory(){}

console.log(contact);
console.log(contact.id)