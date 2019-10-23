contacts = [];

class Store {
  constructor(contacts) {
    this.contacts = contacts;
    // this.init = () => {

    //   if (localStorage.getItem('contacts')) {
    //     contacts = JSON.parse(localStorage.getItem('contacts'));
    //   }
    //   //refreshDOMTable(contacts)
    //   console.log('????????');
    // }

    // this.init();
  }
}
new Store();