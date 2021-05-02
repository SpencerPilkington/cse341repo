const path = require('path');

const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();


const userInput = require('./prove02-input');


router.get('/',(req,res,next) => {
    const books = userInput.books;
    const summaries = userInput.summaries;
    console.log(books);
    console.log(summaries);
    res.render('main', {
        books: books,
        summaries: summaries,
        pageTitle: 'Homepage',
        path: '/'
    });
});

module.exports = router;