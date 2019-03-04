const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const uri = "mongodb+srv://<USERNAME>:<PASSWORD>@firstcluster-ydhgw.mongodb.net/shop?retryWrites=true";
const client = new MongoClient(uri, {useNewUrlParser: true});
let db;

const connectClient = callback => {
  client.connect()
  .then(() => {
    console.log("NoSQL Connected");
    db = client.db();
    callback();
  }).catch(err => console.log(err));
};

const getDb = () => {
  if(db){
    return db;
  }
  throw 'database not found';
};

exports.connectClient = connectClient;
exports.getDb = getDb;