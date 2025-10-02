import getTemplate from './template';

export default class Contact {
  constructor(data){
    this.id = data.id;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.createdAt = data.createdAt;
    
  }
  render (elt) {
    const template = document.createElement("div");
    template.innerHTML = getTemplate(this);
    elt.append(template);

  }
}