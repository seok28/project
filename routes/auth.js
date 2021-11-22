const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/login', (req, res, next) => {
    // 로그인 요청 들어오면 local 전략 수행 
    passport.authenticate('local', (authError, user, info) => {
        if (user) req.login(user, loginError => res.redirect('/'));  // 성공 (user 존재하면 login 호출)
        else next(`Login fail!`); // 실패 
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    // 로그아웃 라우터의 요청이 들어오면 req.user,session 객체 내용 삭제함
    req.logout();
    req.session.destroy();
    res.redirect('/');
});
// 카카오 로그인 전략 수행 
router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback',
    passport.authenticate('kakao', { failureRedirect: '/' }), //실패했을 경우 index로 redirect
    (req, res) => res.redirect('/')  // 성공했으면 index로 redirect 
);

module.exports = router;