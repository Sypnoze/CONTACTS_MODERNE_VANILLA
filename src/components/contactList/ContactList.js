 import DB from '../../DB';
 import Contact from '../contact/Contact';
 import getTemplate from './template';



export default class ContactsList {
  constructor(data){
    this.domELT = document.querySelector(data.elt);
    this.contactsDomElt = null;
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
    this.contactsDomElt = this.domELT.querySelector(".contacts-table tbody");
    this.contacts.forEach((contact)=>contact.render(this.contactsDomElt));
    this.renderItemsleftCount();
    this.initEvents()
  }

async addContact(firstName, lastName, email) {
  // Create a new contact by sending the data to the API
  const newContact = await DB.create({ firstname: firstName, lastname: lastName, email });

  // Add the newly created contact to the local contacts list
  const contact = new Contact(newContact);
  this.contacts.push(contact);

  // Re-render the list to include the new contact
  this.render();
}


  initEvents() {
  // Ajout de l'événement click au bouton "Add"
  this.domELT.querySelector('.new-contact').addEventListener("click", () => {
    // Récupération des valeurs des champs au moment du clic
    const inputs = this.domELT.querySelectorAll('input[type="text"], input[type="email"]');

    // Récupérer les valeurs des champs sans vérifier le nombre d'inputs
    const firstName = inputs[0].value;
    const lastName = inputs[1].value;
    const email = inputs[2].value;

    // Affichage des valeurs dans la console
    console.log("Nouveau contact ajouté:", { firstName, lastName, email });

    // Ajouter le contact
    this.addContact(firstName, lastName, email);

    // Reset des champs après l'ajout
    inputs[0].value = '';
    inputs[1].value = '';
    inputs[2].value = '';
    });
    
  }
}