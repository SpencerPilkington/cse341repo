const path = require('path');

const express = require('express');

const router = express.Router();

const rootDir = require('../util/path');

const books = [];
const summaries = [];


router.get('/add-input',(req,res,next) => {
    res.render('pages/input', {
        title: "Input",
        path: '/add-input',
        books: books,
        summaries: summaries
    });
    

});

router.post('/add-input',(req,res,next) => {
    books.push({name: req.body.books});
    summaries.push({name: req.body.summaries});
    res.redirect('/main');
});


exports.routes = router;
exports.books = books;
exports.summaries = summaries;