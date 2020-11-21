const Sequelize = require('sequelize');

const sequelize = new Sequelize('workinit', 'postgres', 'Fcvmsin1!', {
  host: 'localhost',
  dialect: 'postgres'

});

sequelize.authenticate().then(
  function() {
    console.log('Connected to workinit postgres database')
  },
  function(err) {
    console.log(err)
  }
);
//TODO: Deploy to heroku server

module.exports = sequelize;

