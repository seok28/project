const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res, next) => {
    try {
       res.render('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.get('/write',(req,res,next) => {
    try {
        res.locals.title = require('../package.json').name;
        res.locals.port = router.get('port');
        res.render('/write');
    }catch(error) {
        console.error(err);
        next(err);
    }
});
router.get('/edit',(req,res,next) => {
    try {
        res.locals.title = require('../package.json').name;
        res.locals.port = router.get('port');
        res.render('/edit');
    }catch(error) {
        console.error(err);
        next(err);
    }
})

module.exports = router;