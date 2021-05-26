var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

var port = process.env.PORT || 5212
var app = express();

app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extends: false }));

const mongoURLI = 'mongodb://localhost:27017/goesl';
mongoose.connect(mongoURLI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("mongo Connect"))
    .catch(err => console.log(err));


// app.get('/', (req, res) => {
//     res.send("welcome");
// })

var Users = require('./routers/routers')
app.use('', Users);

app.listen(port, () => { console.log('server Running on port ' + port); });

