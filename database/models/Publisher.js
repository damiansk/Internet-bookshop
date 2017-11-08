/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Publisher', {
    idPublisher: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    idAddressData: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'AddressData',
        key: 'idAddressData'
      }
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'Publisher'
  });
};
