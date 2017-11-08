/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Author', {
    idAuthor: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    surName: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'Author'
  });
};
