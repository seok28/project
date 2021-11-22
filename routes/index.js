const path = require('path');
const express = require('express');

// models/index User,Comment 구조분해할당
const { User, Post } = require('../models');

const router = express.Router();


router.get('/signIn', (req, res, next) => {
    try {
       res.locals.title= require('../package.json').name;
       res.render('signIn');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/signUp', (req, res, next) => {
    try {
        res.locals.title = require('../package.json').name;
        res.render('signUp');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/post', async (req, res, next) => {
    try {
       res.locals.title = require('../package.json').name;
       res.render('post');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;