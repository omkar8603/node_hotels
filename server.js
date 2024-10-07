const express = require('express')
const app = express()
const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body
 



app.get('/', function (req, res) {
  res.send('Wel Come to My Hotel ... How can I Help You ? , We have List of menus')
})


//Inports the router files
const personRouters = require('./routes/personRouts');

// Use the routers
app.use('/person',personRouters);



// inport menu router file

const menuRouter = require('./routes/menuRoutes');

// use the routers

app.use('/menuitems',menuRouter);


app.listen(3000 , () => {
    console.log("Listing on port 3000");
})







