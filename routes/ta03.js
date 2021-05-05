//TA03 PLACEHOLDER
const { response } = require('express');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const http = require('http');


router.get('/',(req, res, next) => {
    res.render('pages/ta03', { 
        title: 'Team Activity 03', 
        path: '/ta03', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
});

module.exports = router;



