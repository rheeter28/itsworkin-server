require('dotenv').config();//we make the items in env available for the entire app

let express = require('express') // express from dependinciees
let app = express(); // creating an instace of express
let test = require('./controllers/testcontroller')
let user = require('./controllers/usercontroller')
let menu = require('./controllers/menucontroller')
let auth = require('./controllers/authcontroller')
let sequelize = require('./db')

sequelize.sync();
app.use(express.json())//middleware to use res.body
app.use(require('./middlewares/headers'))

//allows client to make api calls
const cors = require('./middlewares/headers');
app.use(cors)


//TEST ROUTE
app.use('/test', test);

app.use('/user', user);

//app.use('/menu', menu);

//PROTECTED ROUTE
app.use(require('./middlewares/validate-session'))
app.use('/auth', auth)

app.listen(3000, function(){
  console.log("Hello")
})

app.use('/api/test', function (req, res){
  res.send('This is data from /api/test endpoint. Its from the server')
})


//TODO: Create route for ADMI Create route for , 
        