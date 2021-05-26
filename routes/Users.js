const express = require("express");
const locationList = require('../models/User')
const users = express.Router()
const jwt = require('jsonwebtoken')
// var cors = require('cors');
// var bodyParser = require('body-parser');
// const app = express();

// app.use(cors())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))



process.env.SECRET_KEY = 'secret'



users.get("/alls",
  (req, res) => {
    locationList.find({

    }).then(data => {
      console.log('data:>>>>>>>>>', data)
      return res.json(data);
    }).catch(error => {
      return res.status(400).send(error);
    });
  })


users.get("/dashboard",
  (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    locationList.findOne({
      _id: decoded._id
    })
      .then(user => {
        if (user) {
          res.status(200).json(user)
        } else {
          alert('User does not exist')
          res.send('User does not exist')
        }
      })
      .catch(err => {
        res.status(400).send('error: ' + err)
      });
  })

users.get("/getcomp",
  (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    locationList.findOne({
      _id: decoded._id
    })
      .then(user => {
        if (user) {
          return res.status(200).json(user.companies)
        } else {
          alert('User does not exist')
        }
      })
      .catch(err => {
        res.status(400).send('error: ' + err)
      });
  })


users.post("/register", (req, res) => {

  let params = req.body;
  if (!params) {
    res.status(400).send("Data Not Found");
  } else {
    locationList.collection.findOne({
      email_address: req.body.email_address,
    }).then(user => {
      if (!user) {
        locationList.create(params)
          .then(user => {
            const payload = {
              _id: user._id,
              user_name: user.user_name,
              address: user.address,
              mobile_number: user.mobile_number,
              email_address: user.email_address,
              password: user.password,
              companies: user.companies,
            }
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 1440
            })
            res.json({ token: token, data: user })
          })
          .catch(err => {
            res.send('if catch error: ' + err)
          })
      } else {
        // res.json({ error: 'User already exists' })
        return alert('User already exists');
      }
    })
      .catch(err => {
        res.send('last catcherror: ' + err)
      })

  }
})


users.post("/login", (req, res) => {

  let params = req.body;
  if (!params) {
    // res.status(400).send("Data Not Found");
    return alert("Data Not Found");
  } else {
    locationList.collection.findOne({
      email_address: req.body.email_address,
      password: req.body.password
    }).then(user => {
      if (user) {
        const payload = {
          _id: user._id,
          user_name: user.user_name,
          address: user.address,
          mobile_number: user.mobile_number,
          email_address: user.email_address,
          password: user.password,
          companies: user.companies,
        }
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        return res.json({ token: token, data: user.companies })
        // return alert(user.companies[0]);
      } else {
        return alert('User does not exist')
      }
    })
      .catch(err => {
        res.send('last catch error: ' + err)
        // return alert ('User does  '+err);

      })

  }
})




/*
users.post("/login", (req, res) => {
  let params = req.body;
  if (!params) {
    res.status(400).send("Data Not Found");
  } else {
    locationList.findOne({ email_address: req.body.email_address, password: req.body.password })
      .then(
        data => {
          return res.status(200).send(data);
        }).catch(error => {
          return res.status(400).send(error);
        });
  }
})


users.post("/register",
  (req, res) => {
    let params = req.body
    if (!params) {
      console.log("params");
      res.status(400).send("Data Not Found");
    } else {
      const user = new locationList(req.body)
      user.save().then(data => {
        return res.status(200).send(data);
      }).catch(error => {
        return res.status(400).send(error);
      });
    }
  })

users.put("/update/:key",
  (req, res) => {
    let key = req.params.key;
    let params = req.body;
    if (!params) {
      res.status(400).send("Data Not Found");
    } else {
      locationList.findOneAndUpdate({ key: key }, { $set: params }, { new: true })
        .then(
          data => {
            return res.status(200).send(data);
          }).catch(error => {
            return res.status(400).send(error);
          });
    }
  });

users.delete("/:id", (req, res) => {
  let id = req.params.id;
  locationList.findByIdAndRemove({ _id: id })
    .then(
      data => {
        if (!data) {
          // conso
          return res.status(400).send("no data avalibale for delet.");
        } else {
          return res.status(200).json({
            responseCode: 200,
            responseDesc: "data sucessful deleted"
          }).send();
        }
      })
});
*/

module.exports = users