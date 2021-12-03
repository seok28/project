const path = require('path');
const express = require('express');
const Post = require('../models/post');

const router = express.Router();


// 게시글 작성 
router.route('/write') 
    .get( (req,res) => {
        res.render('write.html');
    })
    .post(async(req,res,next)=> {
        const { title,contents } = req.body;
        try {
            await Post.create ({ title, contents });
            res.redirect('/board');
        } catch(error) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;