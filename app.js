const path = require('path');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');
const passport = require('passport');

const { sequelize } = require('./models');

const passportConfig = require('./passport');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const commentRouter = require('./routes/comment');
const indexRouter = require('./routes');


dotenv.config(); 
passportConfig(); 

const app = express();
app.set('port',process.env.PORT || 3000);

app.set('view engine','html');
nunjucks.configure(path.join(__dirname,'views'), {
    express : app,
    watch : true,
});

sequelize.sync({ force: false })
  .then(() => (console.log('데이터 베이스 연결 성공')))  
  .catch(err => console.error(err)); 

  app.use(
    morgan('dev'),  
    express.json(), // JSON 형식의 데이터를 분석(파싱)해서 요청객체의 body에 추가시켜주는 것  
    express.urlencoded({ extended: false }), // url 파싱해서 params에 속성 추가   
    cookieParser(process.env.SECRET),  // 요청자가 누구인지 알기위해 사용하는 미들웨어 
    session({   // 쿠키를 관리하기 위해 사용하는 미들웨어 
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET,
        cookie: {
            httpOnly: true,
            secure: false
        },
        name: 'session-cookie'
    })
);


app.use(passport.initialize()); // 요청객체에 passport의 설정 값 적용
app.use(passport.session());  // 요청객체에 passport 세션 정보 저장 


app.use((req, res, next) => {
    res.locals.title = require('./package.json').name;
    res.locals.port = app.get('port');
    res.locals.user = req.user;
    res.render('index'); // index.html 렌더링 
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'),'번 포트에서 대기 중');
});