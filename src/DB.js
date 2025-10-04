export default class DB {
  static setApiURL(data){
    this.apiURL = data;
  }
  static async findAll(){
    const response = await fetch(this.apiURL + "contacts");
    return response.json();
  }

  static async create(data) {
    const response = await fetch(this.apiURL + "contacts",{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      createdAt: Date.now(),
      })
    });
    return response.json();

  }

  static async deleteOneById(id) {
    const response = await fetch(this.apiURL + "contacts/" +id,{
      method: "DELETE",
    });
    return response.json();

  }

static async updateOne(contact) {
  const response = await fetch(this.apiURL + "contacts/" + contact.id, {
    method: "PUT", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstname: contact.firstname,
      lastname: contact.lastname,
      email: contact.email,
      createdAt: contact.createdAt, 
    }),
  });
  return response.json();
}

  
}