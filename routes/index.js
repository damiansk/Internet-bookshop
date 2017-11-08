const express = require('express');
const router = express.Router();
const models = require('../database/models');

/* GET home page. */
router.get('/', (req, res, next) => {
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

module.exports = router;
