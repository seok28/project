const path = require('path');
const express = require('express');

const router = express.Router();


router.get('/signIn', (req, res, next) => {
    try {
       res.render('signIn');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/signUp', (req, res, next) => {
    try {
        res.render('signUp');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/board', async (req, res, next) => {
    try {
       res.render('post');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;