/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Category', {
    idCategory: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'Category'
  });
};
