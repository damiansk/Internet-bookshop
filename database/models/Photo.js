/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Photo', {
    photoLink: {
      type: DataTypes.STRING(255),
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
    }
  }, {
    tableName: 'Photo'
  });
};
