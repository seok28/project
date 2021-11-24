const express = require('express');
const Post = require('../models/post');
const router = express.Router();

const getAllpost = async (req,res) => {
    try {
        const posts = await Post.findAll ({});
        res.status(200).render('post', { posts });
    }catch(error) {
        res.status(403).send({ error: error.message });
    }
};



module.exports =router;