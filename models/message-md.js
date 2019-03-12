const { getDb } = require("../util/database");

class Message {
  constructor(email, message){
    this.email = email;
    this.message = message;
  } 
  create(){
    const db = getDb();
    return db.collection("messages").insertOne(this)
    .then(message => message)
    .catch(err => console.log(err));
  }
}

module.exports = Message;