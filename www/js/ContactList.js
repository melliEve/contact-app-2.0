let contacts = [];
class ContactList extends Contact {
  constructor(contacts) {
    super();
    this.contacts = contacts;
    this.listen();
    this.refreshDOMTable();
    this.enableDisableNewUserModal();
    this.init();
  }

  refreshDOMTable = () => {
    let tableContainer = document.createElement('tableContainer');
    tableContainer = document.querySelector('#tableContainer');
    let oldTableBody = document.querySelector('#tableBody');
    oldTableBody.setAttribute('id', 'tableBody');
    oldTableBody.remove();
    let newTableBody = document.createElement('span');
    newTableBody.setAttribute('id', 'tableBody');
    tableContainer.append(newTableBody);

    for (let i = 0; i < contacts.length; i++) {
      let currentRow = document.createElement('div');
      currentRow.setAttribute('class', 'table-row');
      currentRow.setAttribute('contact-index', i)
      newTableBody.append(currentRow);

      let currentNameColumn = document.createElement('div');
      currentNameColumn.innerHTML = contacts[i].name;
      currentNameColumn.setAttribute('class', 'table-column name');
      currentRow.append(currentNameColumn);

      let currentPhoneColumn = document.createElement('div');
      currentPhoneColumn.innerHTML = contacts[i].phone;
      currentPhoneColumn.setAttribute('class', 'table-column phone')
      currentRow.append(currentPhoneColumn);

      let currentEmailColumn = document.createElement('div');
      currentEmailColumn.innerHTML = contacts[i].email;
      currentEmailColumn.setAttribute('class', 'table-column email');
      currentRow.append(currentEmailColumn);

      let currentEditBtn = document.createElement('span');
      currentEditBtn.innerHTML = '<i class="fas fa-edit"></i>';
      currentEditBtn.setAttribute('class', 'table-column edit i');
      currentRow.append(currentEditBtn);

      let currentDeleteBtn = document.createElement('span');
      currentDeleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
      currentDeleteBtn.setAttribute('class', 'table-column delete i');
      currentRow.append(currentDeleteBtn);


      let currentInfoBtn = document.createElement('span');
      currentInfoBtn.innerHTML = '<a href = "/contact/' + contacts[i].id + '"><i class="fas fa-info"></i></a>'
      currentInfoBtn.setAttribute('class', 'table-column info i');
      currentRow.append(currentInfoBtn);
    }
  }
  // init = () => {
  //   console.log('????????');

  //   if (localStorage.getItem('contacts')) {
  //     contacts = JSON.parse(localStorage.getItem('contacts'));
  //   }
  //   refreshDOMTable()
  // }
  // init();

  enableDisableNewUserModal = (option) => {
    let newPersonName = document.querySelector('#newPersonName');
    let newPersonPhone = document.querySelector('#newPersonPhone');
    let newPersonEmail = document.querySelector('#newPersonEmail');
    newPersonName.value = '';
    newPersonPhone.value = '';
    newPersonEmail.value = '';

    let newPersonModal = document.querySelector('#newPersonModal');
    newPersonModal.setAttribute('class', `${option}-modal`);

    let backdrop = document.querySelector('#backdrop');
    backdrop.setAttribute('class', `${option}-modal`);
  }

  listen() {
    const [listen, unlisten] = (() => {
      let listeningOnType = {};
      let listeners = [];

      function listen(eventType, cssSelector, func) {
        // Register a "listener"
        let listener = { eventType, cssSelector, func };
        listeners.push(listener);
        // If no listener on window[eventType] register  a real/raw js-listener
        if (!listeningOnType[eventType]) {
          // add event listener for this type on the whole window
          window.addEventListener(eventType, e => {
            listeners
              .filter(x => x.eventType === eventType)
              .forEach(listener => {
                if (e.target.closest(listener.cssSelector)) {
                  listener.func(e);
                }
              });
          });
          listeningOnType[eventType] = true;
        }
        return listener;
      }

      function unlisten(listener) {
        listeners.splice(listeners.indexOf(listener), 1);
      }

      return [listen, unlisten];
    })();

    this.addEntryListener = listen('click', '#addNewEntry', (e, input) => {
      document.querySelector('#modalHeader').innerHTML = "Lägg till ny kontakt";
      //remove previous error styling
      let inputs = [...document.querySelectorAll('#newPersonModal input')];
      for (input of inputs) { input.className = ''; }

      newPersonName.parentElement.setAttribute('contact-index', '');
      this.enableDisableNewUserModal('enable');
      this.refreshDOMTable();
    });

    let deleteContactFromList = (i) => {
      contacts = contacts.filter((contact, index) => index != i)

      localStorage.setItem('contacts', JSON.stringify(contacts));
      this.refreshDOMTable();
    }

    this.deleteListener = listen('click', '.delete', e => {
      let contactToDelete = e.target.closest('.table-row').getAttribute('contact-index');
      let isSure = window.confirm('är du säkert att du vill ta bort ' + contacts[contactToDelete].name + ' från listan?')
      if (isSure) {
        deleteContactFromList(contactToDelete);
      }
    });

    this.editListener = listen('click', '.edit', (e, input) => {

      document.querySelector('#modalHeader').innerHTML = "Redigera kontakten";

      //remove previous error styling
      let inputs = [...document.querySelectorAll('#newPersonModal input')];
      for (input of inputs) { input.className = ''; }

      //grab the current contact
      let indexToEdit = e.target.closest('.table-row').getAttribute('contact-index');
      let personToEdit = contacts[indexToEdit];
      this.enableDisableNewUserModal('.enable');
      let newPersonName = document.querySelector('#newPersonName');
      newPersonName.value = personToEdit.name;
      let newPersonPhone = document.querySelector('#newPersonPhone');
      newPersonPhone.value = personToEdit.phone;
      let newPersonEmail = document.querySelector('#newPersonEmail');
      newPersonEmail.value = personToEdit.email;
      newPersonName.parentElement.setAttribute('contact-index', indexToEdit)
    });

    this.saveBtnListener = listen('click', '#newPersonSaveBtn', () => {
      let newPersonName = document.querySelector('#newPersonName').value.trim();
      let newPersonPhone = document.querySelector('#newPersonPhone').value.trim();
      let newPersonEmail = document.querySelector('#newPersonEmail').value.trim();

      if (newPersonName === '')
        document.querySelector('#newPersonName').className = 'input-err';
      else
        document.querySelector('#newPersonName').className = '';

      if (newPersonName !== '' || newPersonPhone !== '' || newPersonEmail !== '') {
        //let newPerson = new Person(newPersonName, newPersonPhone, newPersonEmail);
        let newPerson =
        {
          'name': newPersonName,
          'phone': newPersonPhone,
          'email': newPersonEmail,
          'logs': []
        }

        let indexToEdit = document.querySelector('#newPersonModal').getAttribute('contact-index');
        if (indexToEdit) {
          //save changes
          contacts[indexToEdit] = newPerson
        } else {
          //add new contact
          contacts = [
            ...contacts,
            newPerson
          ];
        }

        localStorage.setItem('contacts', JSON.stringify(contacts));
        this.enableDisableNewUserModal('disable');
        this.refreshDOMTable(console.log('saved to localStorage'));
      }
    });

    this.cancelBtnListener = listen('click', '#newPersonCancelBtn', e => {
      this.enableDisableNewUserModal('disable')
    });

    this.returnBtn = listen('click', '#returnBtn', () => {
      location.assign("https://www.localhost3000")
      console.log('works?');

    });
  }
}
new ContactList();