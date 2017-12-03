const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');
const models = require('../database/models');
const Cart = require("../models/cart");

const csrfProtection = csrf();

router.use(csrfProtection);

const {Order, Book, BookInOrder, AddressData, User} = models;

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

router.get('/account', isLoggedIn , (req, res, next) => {
    const successMsg = req.flash('success')[0];
    const email = req.session.passport.user;
    User.findOne({
        where: { email }
    }).then(user => {
        const idAddressData = user.get('idAddressData');
        const idDeliveryData = user.get('idDeliveryData');
        const idInvoiceData = user.get('idInvoiceData');
        AddressData.findOne({
            where: {idAddressData}
        }).then(addressData => {
            AddressData.findOne({
                where: {idAddressData: idDeliveryData}
            }).then(deliveryData => {
                AddressData.findOne({
                    where: {idAddressData: idInvoiceData}
                }).then(invoiceData => {
                    res.render('user/account', {successMsg: successMsg, noMessages: !successMsg, user,addressData,deliveryData,invoiceData, csrfToken: req.csrfToken()});
                });
            });
        });
    });
});


router.post('/account', function (req, res, next) {
    const email = req.session.passport.user;
    User.findOne({
        where: {email}
    }).then(user => {
        const idAddressData = user.get('idAddressData');
        const idDeliveryData = user.get('idDeliveryData');
        const idInvoiceData = user.get('idInvoiceData');
        AddressData.findOne({
            where: {idAddressData}
        }).then(addressData => {
            addressData.update({
                fisrtName: req.body.firstName,
                surname: req.body.surname,
                nipNumber: req.body.nipNumber ? req.body.nipNumber : null,
                phoneNumber: req.body.phoneNumber,
                street: req.body.street,
                houseNumber: req.body.houseNumber,
                apartmentNumber: req.body.apartmentNumber  ? req.body.apartmentNumber : null,
                postalCode: req.body.postalCode,
                city: req.body.city
            }).then(() =>{});
        });

        if(idDeliveryData != idAddressData){
            AddressData.findOne({
                where: {idAddressData: idDeliveryData}
            }).then(deliveryData => {
                deliveryData.update({
                    fisrtName: req.body.firstNameDelivery,
                    surname: req.body.surnameDelivery,
                    nipNumber: req.body.nipNumberDelivery ? req.body.nipNumberDelivery : null,
                    phoneNumber: req.body.phoneNumberDelivery,
                    street: req.body.streetDelivery,
                    houseNumber: req.body.houseNumberDelivery,
                    apartmentNumber: req.body.apartmentNumberDelivery ? req.body.apartmentNumberDelivery : null,
                    postalCode: req.body.postalCodeDelivery,
                    city: req.body.cityDelivery
                }).then(() => {});
            });
        }else{
            AddressData.create({
                name: 'name',
                fisrtName: req.body.firstNameDelivery,
                surname: req.body.surnameDelivery,
                nipNumber: req.body.nipNumberDelivery ? req.body.nipNumberDelivery : null,
                phoneNumber: req.body.phoneNumberDelivery,
                street: req.body.streetDelivery,
                houseNumber: req.body.houseNumberDelivery,
                apartmentNumber: req.body.apartmentNumberDelivery ? req.body.apartmentNumberDelivery : null,
                postalCode: req.body.postalCodeDelivery,
                city: req.body.cityDelivery
            }).then( ({idAddressData}) => {
                user.update({
                    idDeliveryData: idAddressData
                }).then(() => {})
            });
        }

        if(idInvoiceData != idAddressData){
            AddressData.findOne({
                where: {idAddressData: idInvoiceData}
            }).then(invoiceData => {
                invoiceData.update({
                    fisrtName: req.body.firstNameInvoice,
                    surname: req.body.surnameInvoice,
                    nipNumber: req.body.nipNumberInvoice ? req.body.nipNumberInvoice : null,
                    phoneNumber: req.body.phoneNumberInvoice,
                    street: req.body.streetInvoice,
                    houseNumber: req.body.houseNumberInvoice,
                    apartmentNumber: req.body.apartmentNumberInvoice ? req.body.apartmentNumberInvoice : null,
                    postalCode: req.body.postalCodeInvoice,
                    city: req.body.cityInvoice
                }).then(() => {});
            });
            
        }else{
            AddressData.create({
                name: 'name',
                fisrtName: req.body.firstNameInvoice,
                surname: req.body.surnameInvoice,
                nipNumber: req.body.nipNumberInvoice ? req.body.nipNumberInvoice : null,
                phoneNumber: req.body.phoneNumberInvoice,
                street: req.body.streetInvoice,
                houseNumber: req.body.houseNumberInvoice,
                apartmentNumber: req.body.apartmentNumberInvoice ? req.body.apartmentNumberInvoice : null,
                postalCode: req.body.postalCodeInvoice,
                city: req.body.cityInvoice
            }).then( ({idAddressData}) => {
                user.update({
                    idInvoiceData: idAddressData
                }).then(() => {})
            });
        }
    });

    req.flash('success', 'Successfully saved data!');
    res.redirect('/user/account')
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
