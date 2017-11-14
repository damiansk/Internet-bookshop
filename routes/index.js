const express = require('express');
const router = express.Router();
const models = require('../database/models');

const Cart = require('../models/cart');
const Book = require('../database/models').Book;

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
        
        res.render('shop/index', {title: 'Bookstore', bookChunks});
    })
    .catch(err => {
        res.render('shop/index', {title: 'Bookstore'});
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
