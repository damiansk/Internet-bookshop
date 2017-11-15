const express = require('express');
const router = express.Router();
const models = require('../database/models');

const Cart = require('../models/cart');
const Book = require('../database/models').Book;
const Order = require('../database/models').Order;
const BookInOrder = require('../database/models').BookInOrder;

router.get('/', (req, res) => {
    const successMsg = req.flash('success')[0];

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
        
        res.render('shop/index', {title: 'Bookstore', bookChunks, successMsg: successMsg, noMessages: !successMsg});
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

router.get('/checkout',isLoggedIn, function (req, res, next) {
    if(!req.session.cart){
        return res.redirect('shop/shopping-cart');
    }
    const cart = new Cart(req.session.cart.items);
    const errMsg = req.flash('error')[0];
    res.render('shop/checkout',{total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout',isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart.items);

    var stripe = require("stripe")(
        "sk_test_5HkmV6RTQ3qFxx9rvfTwRYNI"
    );

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test Charge"
    }, function(err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getYear();

        if(day < 10){
            day = '0' + day;
        }
        if(month < 10) {
            month = '0' + month;
        }

        today = year + '-' + month + '-' + day;
        Order.create({
            idUser: req.session.passport.user,
            orderDate: today,
            totalPrice: cart.totalPrice,
            status: 'paid',
            comments: req.body.comment || null

        }).then((newOrder) => {
            for(const id in cart.items){
                BookInOrder.create({
                    idOrder: newOrder.getDataValue('idOrder'),
                    ISBN: cart.items[id].item.ISBN,
                    quantity: cart.items[id].qty
                }).then((newBookInOrder)=>{});
        }
        });
        req.flash('success', 'Successfully bought product!');
        req.session.cart = null;
        res.redirect('/');

    });
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}

module.exports = router;
