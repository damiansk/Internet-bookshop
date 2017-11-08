/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Deliverer', {
    idDeliverer: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    idAddresData: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'AddressData',
        key: 'idAddressData'
      }
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'Deliverer'
  });
};
