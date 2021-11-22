// const express = require('express');
// const bcrypt = require('bcrypt')
// const User = require('../models/user');

// const router = express.Router();

// router.route('/')
//     .get(async (req, res, next) => {
//         try {
//             // user 테이블 정보중에 id정보를 가져옴
//             const users = await User.findAll({
//                 attributes: ['id']
//             });

//             res.locals.title = require('../package.json').name;
//             res.locals.port = process.env.PORT; 
//             res.locals.users = users.map(v => v.id);  // map 함수를 사용하여 users안에 id에 대한 정보를 담음
//             res.render('user');  //user.html 렌더링
//         } catch (err) {
//             console.error(err);
//             next(err);
//         }
//     })
//     .post(async (req, res, next) => {
//         const { id, password, name, description } = req.body; //사용자 정보를 등록하기 위해 user 테이블에 정보를 구조분해할당 하고있음

//         if (!password) return next('비밀번호를 입력하세요.');
//         // where 옵션을 사용하여 user테이블의 id만 조회
//         const user = await User.findOne({ where: { id } }); 
//         if (user) { 
//             next('이미 등록된 사용자 아이디입니다.');
//             return;
//         }

//         try {
//             // bcrypt 모듈의 hash 함수를 이용해 password 암호화
//             const hash = await bcrypt.hash(password, 12);
//             // user 테이블에 hash 함수를 이용해 password 암호화를 적용
//             await User.create({
//                 id,
//                 password: hash,
//                 name,
//                 description
//             });
//             res.redirect('/');
//         } catch (err) {
//             console.error(err);
//             next(err);
//         }
//     });

// router.post('/update', async (req, res, next) => {
//     try {
//         // user 테이블의 description 부분을 업데이트 하는데 where옵션(조건)을 사용하여 해당 id의 속하는 description을 넘겨주어 업데이트함
//         const result = await User.update({
//             description: req.body.description
//         }, {
//             where: { id: req.body.id }
//         });
//         if (result) res.redirect('/');
//         else next('Not updated!')
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// });

// router.get('/delete/:id', async (req, res, next) => {
//     try {
//         // where 옵션을 사용해 id 파라미터에 해당하는 행을 모두 삭제하게함(destroy 함수)
//         const result = await User.destroy({
//             where: { id: req.params.id }
//         });

//         if (result) res.redirect('/');
//         else next('Not deleted!')
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// });

// router.get('/:id/comments', async (req, res, next) => {
//     try {
//         // where 옵션을 이용해 해당 정보를 조회함
//         const user = await User.findOne({
//             where: { id: req.params.id }
//         });
//         // 위에서 user 정보를 가져와서 있으면 getComments를 통해 comments 정보를 응답해줌
//         if (user) {
//             const comments = await user.getComments();
//             res.json(comments);
//         } else
//             next(`There is no user with ${req.params.id}.`);
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// });

// router.get('/:id', async (req, res, next) => {
//     try {
//         // user 테이블의 정보를 where 옵션(id)과 attributes 옵션(id,name,description)을 통해 가져옴
//         const user = await User.findOne({
//             where: { id: req.params.id },
//             attributes: ['id', 'name', 'description']
//         });
//         // 모든 사용자 정보 응답해줌
//         res.json(user);
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// });

// module.exports = router;