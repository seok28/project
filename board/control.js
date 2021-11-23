const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.locals.title = require('../package.json').name;
    res.locals.port = process.env.port;
    try {
       res.render('post');
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.get('/write',(req,res,next) => {
    try {
        res.render('postWrite');
    }catch(error) {
        console.error(err);
        next(err);
    }
});
router.get('/edit',(req,res,next) => {
    try {
        res.render('edit');
    }catch(error) {
        console.error(err);
        next(err);
    }
})

module.exports = router;