let express = require("express") //importing express
let router = express.Router() //accessing Router() method
let sequelize = require('../db'); 
let User = sequelize.import('../models/user');
let bcrypt = require('bcryptjs')// imported bcryptjs package from package.json
let jwt = require('jsonwebtoken');//importing package from package.json


//USER ENDPOINT test
// router.post('/createuser', function(req,res) {
//   var username = "heeter";
//   var email = "test@email.com";
//   var pass = "charlie";

//   User
//   .create({
//     username: username,
//     email: email,
//     passwordhash: pass
//   })
//   .then(
//     function message() {
//       res.send('the user endpoint is working')
//     }
//   );

// });

//* USER ENDPOINT *
//CREATEUSER HIDDEN PASSWORD
router.post('/register', function(req, res){
  let username = req.body.user.username
  let email = req.body.user.email
  let pass = req.body.user.password

  //check to see if username has already been picked
  let userExists = false;
  User.findOne({
    where : { 
      username,
    },
 }).then((user) => {
   //checks to seed if the username has already been used
   userExists = !!user;

   if(userExists){
     console.log("This user has already exists");
     res.status(400).send("This username has already been chosen");
     return;
   }
 })
  
  User
  .create({
    username: username,
    email: email,
    passwordhash : bcrypt.hashSync(pass,10)// added bcrypt to apply hash algorithm and hashSync to encode our password
  })
  .then(
    function createSuccess(user){
      let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})// created variable 'token' given data of user.id(primary key of usetable and number assigned to user in DB)
      res.json({
        user: user,
        message: "Account has been registered", // message recieved when new user is created
        sessionToken: token //sessionToken is created when new user is created
      })
    },
    function createError(err){
      res.send(500, err.message)
    }
  );
});

//SIGNIN ROUTE
router.post('/login', function(req, res){
  User.findOne({ where : {username: req.body.user.username } } ).then(
    
    function(user){
      if (user){
        bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){
        if (matches) {
          var token = jwt.sign({id: user.id},process.env.JWT_SECRET, {expiresIn: 60*60*24});
          res.json({
            user: user,
            message: "successfully authenticated",
            sessionToken: token
          });
        } else {
          res.status(502).send({error: "oh no something happened"})
        }
        });
      } else {
        res.status(500).send({error: 'You were not able to signin, please try again'})
      }
    },
    function(err){
      res.status(501).send({error: "someing went wrong"})
    }
  );
});

module.exports = router;