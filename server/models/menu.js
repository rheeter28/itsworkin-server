module.exports = function(sequelize, DataTypes) {
  return sequelize.define('menu', {
    id: DataTypes.NUMBER,
    title: DataTypes.STRING,
    itemName: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    instructrions: DataTypes.STRING,
  });
};