// const express = require('express');
// const users = express.Router();
// const cors = require('cors');
// const mongoose = require('mongoose');

// const User = require('../model/models')
// users.use(cors());

// users.post('/register', (req, res) => {
//     // res.send("welcome");
//     const userData = {
//         user_name: req.body.user_name,
//         address: req.body.address,
//         mobile_number: req.body.mobile_number,
//         email_address: req.body.email_address,
//         password: req.body.password,
//     }
//     User.findOne({
//         email_address: req.body.email_address,
//     })
//         .then(user => {
//             if (!user) {
//                 User.create(userData)
//                     .then(user => {
//                         const payload = {
//                             _id: user._id,
//                             user_name: user.user_name,
//                             address: user.address,
//                             mobile_number: user.mobile_number,
//                             email_address: user.email_address,
//                         }
//                     })
//                     .catch(err => {
//                         res.send("error: " + errF)
//                     })
//             } else {
//                 res.json({ "error": "User Already Exist" });
//             }
//         })
//         .catch(err => {
//             res.send("errror : " + err);
//         })
// })
// users.get('', ( req,res ) => {
//     res.send("usr")
//     User.find({
//         email_address: req.body.email_address,
//     })
//         .then(user => {
//         } ).cat
// })

// module.exports = users;

const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')


const User = require('../model/models')
// const { User, Company } = require('../model/models')
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
    const userData = {
        user_name: req.body.user_name,
        address: req.body.address,
        mobile_number: req.body.mobile_number,
        email_address: req.body.email_address,
        password: req.body.password,
        // companies:  req.body.companies.name,
    }

    User.collection.findOne({
        email_address: req.body.email_address,
    })
        //TODO bcrypt
        .then(user => {
            if (!user) {
                User.create(userData)
                    .then(user => {
                        const payload = {
                            _id: user._id,
                            user_name: user.user_name,
                            address: user.address,
                            mobile_number: user.mobile_number,
                            email_address: user.email_address,
                            password: user.password,
                            // companies:  user.companies,
                        }
                        let token = jwt.sign(payload, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        })
                        res.json({ token: token })
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            } else {
                res.json({ error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.post('/login', (req, res) => {
    User.findOne({
        email_address: req.body.email_address,
        password: req.body.password,
    })
        .then(user => {
            if (user) {
                const payload = {
                    _id: user._id,
                    user_name: user.user_name,
                    address: user.address,
                    mobile_number: user.mobile_number,
                    email_address: user.email_address,
                    password: user.password,
                    // companies:  user.companies,
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.json({ token: token })
            } else {
                res.json({ error: 'User does not exist' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.get('/dashboard', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User.findOne({
        _id: decoded._id
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send('User does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})


users.get('/sd', (req, res) => {
             res.send("comp")
 });


// users.get('/comp', (req, res) => {
//     // var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
//     let comp = Company.find({}, function (err, comp) {

//         if (err) {
//             console.log(err);
//         } else {
//             res.json(comp)
//         }
//     });
// });

module.exports = users
/*
{
"user_name":"nAYNEJ ",
"address":"PDSF;SDF",
"mobile_number":"5656565",
"email_address":"DSD@DSFSD.FG",
"password":"1414" 
}
*/