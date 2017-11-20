const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');
const models = require('../database/models');
const Cart = require("../models/cart");

const csrfProtection = csrf();

router.use(csrfProtection);

const {Order, Book, BookInOrder} = models;

router.get('/profile', isLoggedIn, (req, res) => {
    Order.findAll({
        where: {idUser: req.session.passport.user},
        attributes: ['idOrder'],
        include: [{
            model: BookInOrder,
            attributes: ['ISBN', 'quantity'],
            include: [{
                model: Book
            }]
        }]

    }).then(orders =>{
        const items = [];
        const carts = [];
        
        orders.forEach(({BookInOrders}) => {
            const cart = new Cart({});
            BookInOrders.forEach(({quantity, ISBN, Book}) => {
                while(quantity-- > 0) {
                    cart.add(Book, ISBN);
                }
            });
            carts.push(cart);
            items.push(cart.generateArray());
        });
        res.render('user/profile', {orders: carts, items});
    });


});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/');
});

router.use('/', isNotLoggedIn, (req, res, next) => {
   next();
});

router.get('/signup', (req, res,) => {
    const messages = req.flash('error');
    res.render('user/signup', {
        csrfToken: req.csrfToken(),
        hasErrors: messages.length > 0,
        messages
    });
});

router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true
}), function (req, res, next) {
    if(req.session.oldUrl){
        const oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    }else {
        res.redirect('/user/profile');
    }
});

router.get('/signin', (req, res) => {
    const messages = req.flash('error');
    res.render('user/signin', {
        csrfToken: req.csrfToken(),
        hasErrors: messages.length > 0,
        messages
    });
});

router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true
}), function (req, res, next) {
    if(req.session.oldUrl){
        const oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    }else {
        res.redirect('/user/profile');
    }
});

function isLoggedIn(req, res, next) {
   if(req.isAuthenticated()) {
       return next();
   } else {
       res.redirect('/');
   }
}

function isNotLoggedIn(req, res, next) {
    if(!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}

module.exports = router;
