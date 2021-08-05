const { User }=require('../models/User');
// let auth = (req,res,next)=>{
//     //인증처리를 하는곳
//     //클라이언트 쿠키에서 토큰을 가져온다
//     let token=req.cookies.x_auth;

//     //토큰을 복호화 한 후 유저를 찾는다
//     User.findByToken(token,(err,user)=>{
//         if(err) throw err;
//         if(!user) return res.json({isAuth:false,error:true})
//         //user정보가 있다면
//         req.token=token;//token 과 user 를 req 에 넣어줌으로 인해 user 정보를 가질 수 있고, token 을 가질수 있기에 
//         req.user=user;//두가지 정보를 req 에 넣어준것
//         newxt(); // 지금 현재 auth 라는 middleware 이기에 작업끝날때 next
//     })
//     //유저가 있으면 인증 O
//     //유저가 없으면 인증 X
// }

// module.exports={auth};

let auth = (req, res, next) => {
    //인증 처리를 하는곳 
    //클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    // 토큰을 복호화 한후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true })
    // console.log('userh', user)
    req.token = token;
    req.user = user;
    next();
    })
}
module.exports={auth};

