const mongoose = require('mongoose');
const Schema = mongoose.Schema




const UserSchema = new Schema({
    user_name: { type: String, required: true },
    address: { type: String, required: true },
    mobile_number: { type: Number, required: true },
    email_address: { type: String, required: true },
    password: { type: String, required: true },
    // companies: [Company]
},   {
    collection: 'User'
  });

// var Company = new Schema();
// Company.add({
//     name: { type: String, required: true },
// })

// const Company = mongoose.model('Company', Company, 'companies');
const User = mongoose.model('User', UserSchema, 'users');

// module.exports = { User, Company };
module.exports = { User };

// module.exports = mongoose.model(User, UserSchema)