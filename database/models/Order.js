/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Order', {
    idOrder: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idUser: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: 'User',
        key: 'email'
      }
    },
    orderDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Order'
  });
};
