module.exports = function(sequelize, DataTypes) {
  return sequelize.define('auth', {
    authorization: DataTypes.STRING, //think of authtestdata as a string like "testdata"
    authuser: DataTypes.INTEGER // the "owner" is a number, a foreign key, that will point to a specific user on the users table
  });
};