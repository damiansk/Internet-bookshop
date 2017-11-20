'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
const env       = process.env.NODE_ENV || 'development';
const config    = require('../config/config.json')[env];
const db        = {};

let sequelize;
if (config.use_env_constiable) {
  sequelize = new Sequelize(process.env[config.use_env_constiable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
      (file !== basename) &&
      (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Book.hasMany(db.AuthorBook, {foreignKey: 'ISBN', constraints: false});
db.Author.hasMany(db.AuthorBook, {foreignKey: 'idAuthor', constraints: false});
db.AuthorBook.belongsTo(db.Book, {foreignKey: 'ISBN'});
db.AuthorBook.belongsTo(db.Author, {foreignKey: 'idAuthor'});

db.Category.hasMany(db.Book, {foreignKey: 'idCategory', constraints: false});
db.Publisher.hasMany(db.Book, {foreignKey: 'idPublisher', constraints: false});
db.Book.belongsTo(db.Category, {foreignKey: 'idCategory'});
db.Book.belongsTo(db.Publisher, {foreignKey: 'idPublisher'});

db.Order.hasMany(db.BookInOrder,{foreignKey: 'idOrder', constraints: false});
db.Book.hasMany(db.BookInOrder, {foreignKey: 'ISBN', constraints: false});
db.BookInOrder.belongsTo(db.Order,{foreignKey: 'idOrder'});
db.BookInOrder.belongsTo(db.Book, {foreignKey: 'ISBN'});

module.exports = db;
