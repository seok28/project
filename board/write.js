const express = require('express');
const Post = require('../models/post');
const { isLoggedIn } =require('../routes/helper')
const router = express.Router();


// const getAllpost = async (req,res) => {
//     try {
//         const posts = await Post.findAll ({});
//         res.status(200).render('post', { posts });
//     }catch(error) {
//         res.status(403).send({ error: error.message });
//     }
// };


// const getWrite = (req,res) => {
//     try {
//         res.status(200).render('postWrite');
//     }catch(error) {
//         res.status(403).send({ error: error.message });
//     }
// };

// const postWrite = async(req,res ) => {
//     try {
//         const { body : { title,contents} } = req.body;
//     const post = await  Post.create({
//         title,
//         contents
//     });
//     res.redirect('/index/post');
//     }catch(error) {
//         res.status(403).send({ error: error.message });
//     }
// };

router.route('/') 
    .get(isLoggedIn,(req,res) => {
        res.locals.title = require('../package.json').name;
        res.render('postWrite');
    })
    .post( async(req,res,next)=> {
        const { title,contents } = req.body;

        try {
            await Post.create ({ title, contents });
            res.redirect('/');
        }catch(error) {
            console.error(err);
            next(err);
        }
    })

module.exports = router;