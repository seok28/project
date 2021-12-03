const path = require('path');
const express = require('express');

const router = express.Router();


router.get('/', (req, res, next) => {
    try {
       res.render('index.html');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;