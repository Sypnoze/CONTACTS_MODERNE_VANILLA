import DB from '../../DB';  // Importation de DB.js
import getTemplate from './template';

export default class Contact {
  constructor(data) {
    this.id = data.id;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.createdAt = data.createdAt;
    this.domELT = null;
  }

  render(elt) {
    const template = document.createElement("template");
    template.innerHTML = getTemplate(this);
    this.domELT = template.content.firstElementChild;
    elt.append(this.domELT);

    setTimeout(() => this.initEvents(), 0);  // Appeler initEvents après l'ajout de l'élément
  }

  initEvents() {
    this.domELT.querySelector(".btn-delete").addEventListener("click", () => {
      window.ContactList.deleteOneById(this.id);
      this.domELT.remove();
    });

    this.domELT.querySelector(".btn-edit").addEventListener("click", () => {
      this.domELT.classList.add("isEditing");
      this.edit();
    });

    this.domELT.querySelector(".btn-check").addEventListener("click", () => {
      const firstName = this.domELT.querySelector(".input-firstname").value;
      const lastName = this.domELT.querySelector(".input-lastname").value;
      const email = this.domELT.querySelector(".input-email").value;

      this.updateOneById({ firstName, lastName, email });
    });
  }

  async updateOneById(data) {
    this.firstname = data.firstName;
    this.lastname = data.lastName;
    this.email = data.email;

    // Mise à jour du DOM sans utiliser de vérifications
    this.domELT.querySelector(".firstname").textContent = this.firstname;
    this.domELT.querySelector(".lastname").textContent = this.lastname;
    this.domELT.querySelector(".email").textContent = this.email;

    this.domELT.classList.remove("isEditing");

    // Envoi à la base de données
    await DB.updateOne(this);
  }

  edit() {
    // On rend les champs de saisie visibles et cache les spans
    this.domELT.querySelector('.input-firstname').classList.add('isEditing-visible');
    this.domELT.querySelector('.input-lastname').classList.add('isEditing-visible');
    this.domELT.querySelector('.input-email').classList.add('isEditing-visible');
  }
}
