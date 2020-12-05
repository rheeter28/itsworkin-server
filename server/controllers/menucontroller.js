let express = require('express')
let router = express.Router()
let sequelize = require('../db');
let Menu = require('../models/menu')//(sequelize, require('sequelize'))
let validateSession = require('../middlewares/validate-session')


 //GET menu items for user

 //POST menu items for user
 router.get('/recipeguide', validateSession, function(req, res) {
  
 })

 module.exports = router;