/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BookInOrder', {
    idOrder: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Order',
        key: 'idOrder'
      }
    },
    ISBN: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Book',
        key: 'ISBN'
      }
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'BookInOrder'
  });
};
