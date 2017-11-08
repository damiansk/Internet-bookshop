/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AddressData', {
    idAddressData: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    fisrtName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    nipNumber: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    street: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    houseNumber: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    apartmentNumber: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    postalCode: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'AddressData'
  });
};
