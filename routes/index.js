const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const models = require('../database/models');

const Cart = require('../models/cart');
const Book = require('../database/models').Book;

const csrfProtection = csrf();

router.use(csrfProtection);
let categories = [];

models.Category
  .findAll({attributes: ['name']})
  .then(categoriesList => categories = categoriesList);

router.get('/', (req, res) => {
    const { Book, Publisher, Category, AuthorBook, Author } = models;
    AuthorBook.findAll({
        attributes: ['ISBN'],
        include: [
            { model: Author, attributes: ['firstName', 'surName'] },
            {
                model: Book,
                attributes: ['ISBN', 'title', 'description', 'sellingPrice', 'year', 'Thumbnail'],
                include: [
                    { model: Publisher, attributes: ['name'] },
                    { model: Category, attributes: ['name'] }
                ]
            }
        ]
    })
    .then(books => {
        const mappedBooks = books.map(({ISBN, Author, Book}) => ({
                title: Book.title,
                description: Book.description,
                sellingPrice: Book.sellingPrice,
                year: Book.year,
                thumbnail: Book.Thumbnail,
                ISBN,
                author: `${Author.surName} ${Author.firstName}`,
                publisher: Book.Publisher.name,
                category: Book.Category.name
        }));
    
        const bookChunks = [];
        const chunkSize = 4;
        for (let i = 0; i < mappedBooks.length; i += chunkSize) {
            bookChunks.push(mappedBooks.slice(i, i + chunkSize));
        }
        
        res.render('shop/index', {
          csrfToken: req.csrfToken(),
          title: 'Bookstore',
          bookChunks,
          categories
        });
    })
    .catch(err => {
        res.render('shop/index', {
          csrfToken: req.csrfToken(),
          title: 'Bookstore',
          categories
        });
        console.log(`Something went wrong - ${err}`);
    });
});

router.get('/search/:category', (req, res) => {
  const { Book, Publisher, Category, AuthorBook, Author } = models;
  AuthorBook.findAll({
      attributes: ['ISBN'],
      include: [
          { model: Author, attributes: ['firstName', 'surName'] },
          {
              model: Book,
              attributes: ['ISBN', 'title', 'description', 'sellingPrice', 'year', 'Thumbnail'],
              include: [
                  { model: Publisher, attributes: ['name'] },
                  {
                    model: Category,
                    attributes: ['name'],
                    where: {
                      'name': {
                        $like: '%' + (req.params.category || '') + '%'
                      }
                    }
                  }
              ],
              where: {
                $or: {
                  'title': {
                    $like: '%' + (req.param('term') || '') + '%'
                  },
                  'ISBN': {
                    $like: '%' + (req.param('term') || '') + '%'
                  }
                }
              }
          }
      ]
    })
    .then(books => {
      const mappedBooks = books.map(({ISBN, Author, Book}) => ({
        title: Book.title,
        description: Book.description,
        sellingPrice: Book.sellingPrice,
        year: Book.year,
        thumbnail: Book.Thumbnail,
        ISBN,
        author: `${Author.surName} ${Author.firstName}`,
        publisher: Book.Publisher.name,
        category: Book.Category.name
      }));
      
      const bookChunks = [];
      const chunkSize = 4;
      for (let i = 0; i < mappedBooks.length; i += chunkSize) {
        bookChunks.push(mappedBooks.slice(i, i + chunkSize));
      }
      
      res.render('shop/index', {
        csrfToken: req.csrfToken(),
        title: 'Bookstore',
        bookChunks,
        categories
      });
    })
    .catch(err => {
      res.render('shop/index', {
        csrfToken: req.csrfToken(),
        title: 'Bookstore',
        categories
      });
      console.log(`Something went wrong - ${err}`);
    });
});

router.get('/add-to-cart/:id', (req, res) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart.items : {});
    
    Book.findById(productId)
    .then(book => {
        cart.add(book, book.ISBN);
        req.session.cart = cart;
        res.redirect('/');
    })
    .catch(err => res.redirect('/'));
});

router.get('/shopping-cart', function (req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', {products: null});
    }
    const cart = new Cart(req.session.cart.items);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

module.exports = router;
