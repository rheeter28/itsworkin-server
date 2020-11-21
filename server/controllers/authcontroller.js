let router = require('express').Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user');
let AuthModel = sequelize.import('../models/auth');
let validateSession = require('../middlewares/validate-session')



//GET all items for a single user
router.get('/getall', function(req,res) {
  let userid = req.user.id
  
  AuthModel
  .findAll({
    where : { authuser: userid }
  })
  .then(
    function findAllSuccess(data) {
      res.json(data);
    },
    function findAllError(err){
      res.send(500, err.message)
    }
  );

});

// POST  INDIVIDUAL USER
router.post('/create', validateSession, function(req, res) {
let authuser = req.user.id;
console.log(req.body)
let authData = req.body.authdata.item;

  AuthModel
  .create({
    authdata: authData,
    authuser: authuser
  })
  .then(
    function createSuccess(authdata){
      res.json({
        authdata: authdata
      });
    },
    function creatError(err) {
      res.send(500, err.message)
    }
  );
});

router.get('/:id', function(req, res) {
  let data = req.params.id
  let userid = req.user.id

  AuthModel
  .findOne({
    where: { id: data, owner: userid }
  }).then(
    function findOneSuccess(data) {
      res.json(data)
    },
    function findOneError(err) {
      res.send(5000, err.message)
    }
  )
})







module.exports = router;