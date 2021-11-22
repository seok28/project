//로그인
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (user) req.login(user, loginError => res.redirect('/'));  
        else next(`Login fail!`); 
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    
    req.logout();
    req.session.destroy();
    res.redirect('/');
});
// // 카카오 로그인 전략 수행 
// router.get('/kakao', passport.authenticate('kakao'));
// router.get('/kakao/callback',
//     passport.authenticate('kakao', { failureRedirect: '/' }), //실패했을 경우 index로 redirect
//     (req, res) => res.redirect('/')  // 성공했으면 index로 redirect 
// );

module.exports = router;