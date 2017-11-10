const express = require('express');
const router = express.Router();
const models = require('../database/models');
const csrf = require('csurf');
const passport = require('passport');

const csrfProtection = csrf();

router.use(csrfProtection);


router.get('/', (req, res) => {
    const { Book, Publisher, Category, AuthorBook, Author } = models;
    AuthorBook.findAll({
        attributes: ['ISBN'],
        include: [
            { model: Author, attributes: ['firstName', 'surName'] },
            {
                model: Book,
                attributes: ['title', 'description', 'sellingPrice', 'year', 'Thumbnail'],
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

router.get('/user/signup', (req, res,) => {
    const messages = req.flash('error');
    res.render('user/signup', {
        csrfToken: req.csrfToken(),
        hasErrors: messages.length > 0,
        messages
    });
});

router.post('/user/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

router.get('/user/signin', (req, res) => {
    const messages = req.flash('error');
    res.render('user/signin', {
        csrfToken: req.csrfToken(),
        hasErrors: messages.length > 0,
        messages
    });
});

router.post('/user/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));

router.get('/user/profile', (req, res) => {
    res.render('user/profile');
});

module.exports = router;
