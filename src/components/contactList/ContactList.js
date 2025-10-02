 import DB from '../../DB';
 import Contact from '../contact/Contact';
 import getTemplate from './template';
export default class ContactsList {
  constructor(data){
    this.domELT = document.querySelector(data.elt);
    DB.setApiURL(data.apiURL);
    this.contacts = [];
    this.loadContacts();
  }
  async loadContacts () {
    const contacts = await DB.findAll();
    this.contacts = contacts.map((contact)=> new Contact(contact));
    this.render();
  }
  getItemsLeftCount(){
    return this.contacts.length;
  }

renderItemsleftCount(){
  this.domELT.querySelector(".contact-count strong").innerText =
  this.getItemsLeftCount();
}

  render(){
    this.domELT.innerHTML = getTemplate();
    this.contacts.forEach((contact)=>contact.render(this.domELT.querySelector(".contacts-table tbody")));
    this.renderItemsleftCount();
  };
}