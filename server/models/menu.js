module.exports = function(sequelize, DataTypes) {
  return sequelize.define('menu', {
    id: DataTypes.NUMBER,
    itemName: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    analyzedInstructrions: DataTypes.STRING,
  });
};