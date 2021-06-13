//TA03 PLACEHOLDER
// const { response } = require('express');
// const express = require('express');
// const router = express.Router();
// const fs = require('fs');
// const http = require('http');


// router.get('/',(req, res, next) => {
//     res.render('pages/ta03', { 
//         title: 'Team Activity 03', 
//         path: '/ta03', // For pug, EJS 
//         activeTA03: true, // For HBS
//         contentCSS: true, // For HBS
//     });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const fs = require('fs');
const http = require('http');
const fetch = require('node-fetch');

const ITEMS_PER_PAGE = 10;


router.get('/',(req, res, next) => {
    res.render('pages/ta03', { 
        title: 'Team Activity 03', 
        path: '/ta03', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
});
router.get('/search',(req, res, next) => {
    let URL = 'https://byui-cse.github.io/cse341-course/lesson03/items.json';
    const productData = [];
    const tag = req.body.tag;
     fetch(URL)
     .then(res => res.json())
     .then((out) => {
         if (productData != null) {
             out.forEach(data => {
                 productData.push(data)
                 console.log('We made it in this part of the function!');
             })
         }
         console.log(productData[0]);
         let tagProducts = productData.filter((productData) => {
             //Search for tag in a product's tag and add if found
             return productData.tags.includes(tag);

         });
         res.render('pages/ta03', {
            title: 'Team Activity 03',
            path: '/ta03',
            tagProducts: tagProducts,
            currentPage: pageXOffset,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems/ ITEMS_PER_PAGE)
        });
     })
     .catch(err => { throw err });
});
module.exports = router;