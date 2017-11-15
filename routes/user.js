const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');

const csrfProtection = csrf();

router.use(csrfProtection);


router.get('/profile', isLoggedIn, (req, res) => {
    res.render('user/profile');
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
