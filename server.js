const express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const Userrouter = require("./routes/Users"); 
app.use('', Userrouter);

app.listen(5212, () => console.log("server running on the 5212 port"));

