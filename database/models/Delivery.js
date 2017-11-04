/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Delivery', {
    idDelivery: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    ISBN: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'Book',
        key: 'ISBN'
      }
    },
    deliveryDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    numberOfOrdered: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    idDeliverer: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Deliverer',
        key: 'idDeliverer'
      }
    }
  }, {
    tableName: 'Delivery'
  });
};
