const path = require('path');
const express = require('express');
const Post = require('../models/post');

const router = express.Router();
router.route('/') 
    .get( (req,res) => {
        res.render('postWrite');
    })
    .post(async(req,res,next)=> {
        const { title,contents } = req.body;
        try {
            await Post.create ({ title, contents });
            res.redirect('board');
        } catch(error) {
            console.error(err);
            next(err);
        }
    })

module.exports = router;