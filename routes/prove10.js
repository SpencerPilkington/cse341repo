const express = require('express');
const router = express.Router();


const dummyData = {
    "avengers": [
        {
            "name": "Tony Stark"
        },
        {
            "name": "Steve Rogers"
        },
        {
            "name": "Thor Odinson"
        },
        {
            "name": "Bruce Banner"
        },
        {
            "name": "Natasha Romanova"
        },
        {
            "name": "Clint Barton"
        }
    ]
};

router.get ('/getHomepage',(req,res, next) => {
    res.render('pages/prove10', {
        pageTitle: 'Prove10',
        path: '/prove10'

    })
})

router.get('/fetchAll', (req,res, next) => {
    res.json(dummyData)
});

router.post('/insertName', (req,res,next) => {
    if (req.body.newName != undefined) {
        const newName = req.body.newName

        if (!dummyData.avengers.some(a => a.name === newName)) {
            dummyData.avengers.push({ name: newName})
            res.sendStatus(200)
        }
    } else {
        res.sendStatus(400)
    }
})



module.exports = router;