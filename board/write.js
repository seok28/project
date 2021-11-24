const path = require('path');
const express = require('express');
const Post = require('../models/post');
const { isLoggedIn } =require('../routes/helper')
const router = express.Router();

router.route('/') 
    .get(isLoggedIn,(req,res) => {
        res.render('postWrite');
    })
    .post(async(req,res,next)=> {
        const { title,contents } = req.body;
        try {
            await Post.create ({ title, contents });
            res.redirect('post');
        } catch(error) {
            console.error(err);
            next(err);
        }
    })

module.exports = router;