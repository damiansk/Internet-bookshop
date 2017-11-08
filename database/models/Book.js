/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Book', {
    ISBN: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    idPublisher: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'Publisher',
        key: 'idPublisher'
      }
    },
    year: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    idCategory: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'Category',
        key: 'idCategory'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    onDemand: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    suspended: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    purchasePrice: {
      type: "DOUBLE UNSIGNED",
      allowNull: false
    },
    sellingPrice: {
      type: "DOUBLE UNSIGNED",
      allowNull: false
    },
    numberSold: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    Thumbnail: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    dialectOptions: {
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
    },
    tableName: 'Book'
  });
};
