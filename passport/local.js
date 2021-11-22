const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = () => {
  // 로컬 로그인을 하기위한 전략에 관한 설정을 하는 것이고 로그인 라우터의 req.body 속성 입력함 
  passport.use(new Strategy({
    usernameField: 'id',
    passwordField: 'password'
  }, async (id, password, done) => {

    try {
      // 유저가 있는지 id를 사용해 찾음
      const user = await User.findOne({ where: { id } });
      if (user) {
        // findone을 이용해 user를 찾아서 bcrypt모듈의 compare을 사용하여 if,else문으로 구성함
        const result = await bcrypt.compare(password, user.password); // => true, false
        if (result) 
          done(null, user);
        else
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
      } else
        done(null, false, { message: '가입되지 않은 회원입니다.' });
    } catch (error) {
      done(error);
    }
  }));
};