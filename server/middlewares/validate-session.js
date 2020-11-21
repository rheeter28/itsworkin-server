let jwt = require('jsonwebtoken')
let sequelize = require('../db')
let User = sequelize.import('../models/user')

module.exports = function(req, res, next) {
  if(req.method === 'OPTIONS') {
    next()
  } else {
    let sessionToken = req.headers.authorization;
    console.log(sessionToken)
    if(!sessionToken) return res.status(403).sent({auth: false, message: 'No has been token provided.'});
    else {
      jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) =>{
        if(decoded) {
          User.findOne({where: {id: decoded.id}}).then(user => {
            req.user = user;
            next();
          },
          function(){
            res.status(401).send({error: 'Not authorized'});
          })
        } else {
          res.send(400).send({error: 'You are not authorized'});
        }
      });
    }
  }
}