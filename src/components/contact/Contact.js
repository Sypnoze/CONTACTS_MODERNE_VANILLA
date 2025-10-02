import getTemplate from './template';

export default class Contact {
  constructor(data){
    this.id = data.id;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.createdAt = data.createdAt;
    this.domELT = null;
    
  }
  render (elt) {
    const template = document.createElement("template");
    template.innerHTML = getTemplate(this);
    this.domELT = template.content.firstElementChild;
    elt.append(this.domELT);

  }
}