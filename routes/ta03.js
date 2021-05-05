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

function processJson(req, res) {
    let url = 'https://byui-cse.github.io/cse341-course/lesson03/items.json';
    http.get(url,function(response) {
        var body ='';

        response.on('data', function(chunk) {
            body += chunk;
        });

        response.on('end', function(){
            var jsonResponse = JSON.parse(body);
            var stuff = {data:jsonResponse}

            res.render('results', stuff);
        });
    }).on('error', function(e){
        console.log("Got an error: ",e);
    });
}

  
module.exports = router;
module.exports = {processJson: processJson};


