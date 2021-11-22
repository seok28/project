exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) next(); // 인증에 성공했으면 다음 미들웨어 호출 => 로그인 성공
    else res.status(403).send('로그인 필요'); // 403(권한없음) , 메시지 출력 
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) next(); // 로그인되어 있지 않으면 다음 미들웨어 호출
    else res.redirect(`/`);  // 로그인 되어 있으면 index로 이동 
};