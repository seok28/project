const express = require('express');
const router = express.Router();

router.get('/board',(req,res,next) => {
    res.locals.user = req.user;
    try {
        res.render('board.html');
    }catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports =router;