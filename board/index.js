const express = require('express');
const router = express.Router();

router.get('/board',(req,res,next) => {
    try {
        res.render('board.html');
    }catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports =router;