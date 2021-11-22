const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.route('/')
    .get(async(req,res,next) => {
    try {
        const users = await User.findAll({
            attributes : ['id']
        });
        res.render('signUp');
    }catch(err) {
        console.error(err);
        next(err);
    }
})
   .post(async (req,res,next) => {
    const {id, password,name} = req.body;
    if (!password) return next('비밀번호를 입력하세요');
    const user = await User.findOne({ where:{id} });
    if(user) {
        next('이미 등록된 사용자 입니다.');
        return;
    }
    try {
        const hash = await bcrypt.hash(password,12);
        await User.create({
            id,
            password : hash,
            name
        });
        res.redirect('/');
    }catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;