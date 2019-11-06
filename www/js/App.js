
//global variables here
let contacts = store.contacts;
let body = $('body')
body.innerHTML = "";

class App {
  //class to create html structure
  constructor() {
    let newContactForm = create('section');
    newContactForm.setAttribute('class', 'container newContactForm');
    body.append(newContactForm);

    let Contacts = create('section');
    Contacts.setAttribute('class', 'container contacts')
    body.append(Contacts);
  }
}
new App();

class NewForm {
  constructor() {
    this.state = {
      name: 'melli',
      phone: ['12345678'],
      email: ['melli@mel.sie'],
    }
    this.render()
  }
  update(newData = {}, render = true) {
    Object.assign(this.state, newData);
    if (render) {
      this.render()
    }
  }

  render() {
    let createContactDetails = (type) => {
      let html = '';
      this.state[type].map((item, i) => {
        html += `
        <li>
          <div class="flex-row">
          ${item}<button class="deleteListItem" data-key="${i}" data-type="${type}">Ta bort</button>
          </div>
        </li>`
      });
      return html;
    }
    let html = `
      <div class="flex-children newForm">
				<h3>kontakter</h3>
				Namn: 
				<input class="newFormNameInput" type="text" value="${this.state.name}" />
        <div class="contactList">
          <ul class="phone">
          ${createContactDetails('phone')}
          </ul>
          <ul class="email">
          ${createContactDetails('email')}
          </ul>
        </div>
        <div class="toolbar">
          <button class="newFormClear">Rensa</button>
          <button class="newFormAddPhone">+ nummer</button>
          <button class="newFormAddEmail">+ email</button>
          <button class="newFormSave">Spara</button>
        </div>
      </div>
        `
    let divWrapper = create('div');
    divWrapper.innerHTML = html;
    let newFormWrapper = $('.newContactForm');
    newFormWrapper.innerHTML = '';
    newFormWrapper.append(divWrapper);
  }
}

let form = new NewForm();
//listeners for NewForm
//change of name input
//let nameInputListener = 
listen('click', '.newFormNameInput', e => {
  let value = e.target.value;
  let newData = {
    name: value
  }
  form.update(newData, false)
});

//let phoneInputListener = 
listen('click', '.newFormAddPhone', e => {
  let number = prompt('Ange ditt telefonnummer..');
  if (number) {
    //add number to the state
    let thisCurrentState = form.state;
    thisCurrentState.phone.push(number);
    form.update(thisCurrentState);
    console.log(form);
  }
});

//let emailInputListener = 
listen('click', '.newFormAddEmail', e => {
  let mail = prompt('skriv din mail här..')
  if (mail) {
    let thisCurrentState = form.state;
    thisCurrentState.email.push(mail);
    form.update(thisCurrentState);
  }
})

//let saveContactlistener = 
listen('click', '.newFormSave', e => {
  let newContactNameInput = $('.newFormNameInput');

  let name = newContactNameInput.value;

  if (name) {
    let thisCurrentState = form.state;
    thisCurrentState.name = name;
    form.update(thisCurrentState);
    new Contact(thisCurrentState);
  }
  console.log('saved', e.target)
});

//let deleteListener = 
listen('click', '.deleteListItem', e => {
  let type = e.target.getAttribute('data-type');
  let key = e.target.getAttribute('data-key');

  let thisCurrentState = form.state;
  thisCurrentState[type].splice(key, 1);
  form.update(thisCurrentState);
})
//let clearFormListener = 
listen('click', '.newFormClear', e => {
  form.clear();
  console.log('clear', e.target)
});

//new contact - data coming from where u register new contact (not saved to data yet)
let newContactFormData = {
  name: '',
  phone: [],
  email: []
}

let Contact = {
  id: 'unique id for each contact',
  history: [],
  position: 0
}

//DATABASE store.contacts: [Contact, Contact, Contact]
//first time we save a contact to DB it should be like:
// let Contact = {
//   id: Date.now(),
//   history: [],
//   position: 0
// }