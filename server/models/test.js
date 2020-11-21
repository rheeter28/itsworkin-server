//const { setMaxListeners } = require("npm")

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('test', {
    testdata: DataTypes.STRING
  })
}