const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://Archu:Nano15894@nano.qpxpo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
  // const collection = client.db("myFirstDatabase").collection("devices");
  // perform actions on the collection object
  // client.close();
// });

// mongoose.connect('mongodb://127.0.0.1:27017/goesl', { useNewUrlParser: true, useUnifiedTopology: true });
// const mongoURLI = 'mongodb://localhost:27017/goesl';
// const mongoURLI = 'mongodb://localhost:27017/goesl';
// const mongoURLI = "mongodb+srv://nayneshrathod:LsJQHV#XwQjSW@9@mybox.eqmnq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const mongoURLI = "mongodb+srv://nayneshrathod:LsJQHV#XwQjSW@9@cluster0-shard-00-00.ecaql.mongodb.net:27017?ssl=true&replicaSet=atlas-ceza4t-shard-0&authSource=admin&retryWrites=true&w=majority"
// Connect MongoDB at default port 27017.
const uri = "mongodb+srv://Archu:Nano15894@nano.qpxpo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,   
  useCreateIndex: true
})
  .then(() => console.log("mongo Connect"))
  .catch(err => console.log(err));
 
const ModelName = "User";
const Types = mongoose.Schema.Types;
const UsersDetails = new mongoose.Schema({
  user_name: { type: String, required: true },
  address: { type: String, required: true },
  mobile_number: { type: Number, required: true },
  email_address: { type: String, required: true },
  password: { type: String, required: true },
  companies: { type: Array, default: [] },
});


module.exports = mongoose.model(ModelName, UsersDetails)



