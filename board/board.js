const express = require('express');
const {Post,User} = require('../models');
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
    // 게시글 보여주기 
  router.get('/board',async(req,res,next) => {
    res.locals.post = req.Post;
    try {
            const posts = await Post.findAll({
                include: {
                    model: User,
                    attributes: ['id','name'],
                },
            });
            res.render('board', {
                title:'web2',
                twits: posts,
            });
            
        }catch(err) {
            console.error(err);
            next(err);
        }
    });


module.exports = router;