const express = require('express')
const app = express()
const bodyParser= require('body-parser');//npm install body-parser 로 받아온 body-parser 을 불러옴
const { User }= require("./models/User"); // models 의 User.js 파일을 불러옴
const { auth }=require('./middleware/auth');//middleware 의 auth.js 파일 불러옴
const cookieParser=require('cookie-parser');
const config=require('./config/key');


// //application/x-www-form-urlencoded 로 넘어오는 정보를 분석해주기 위해 필요함
// app.use(bodyParser.urlencoded({extended: true}));
// //application/json --> json 형태로 넘어오는걸 받기위해서 필요함
// app.use(bodyParser.json());

//application/x-www-form-urlencoded 로 넘어오는 정보를 분석해주기 위해 필요함
app.use(express.urlencoded({extended:true}));
//application/json --> json 형태로 넘어오는걸 받기위해서 필요함
app.use(express.json());
app.use(cookieParser());

const mongoose = require('mongoose');//NoSQL
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err))

app.get('/',(req, res)=>res.send('Hello World!'))//localhost:5000 접속시 보여지는 화면


app.get('/api/hello',(req,res) =>{
    res.send("Hello World!~ ")
})


app.post('/api/users/register',(req,res) => {
    //회원 가입 시 필요한 정보를 client 에서 가져오면 이를 데이터베이스에 넣어준다
    //post 형식이기에 postman 사용시 post 버전으로! + endpoint 를 register 로 설정했기에 
    //postman 사용시에 http://localhost:5000/register 로 사용
    
    const user = new User(req.body) //body-parser 를 이용해서 req.body로 클라이언트에서 보내는 정보를 받아준다
    user.save((err, userInfo)=>{//.save() 는 몽고DB 에서 오는 메소드 user 모델에 저장이됨
        if(err) return res.json({success:false,err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login',(req,res)=>{
    //요청된 이메일을 DB에서 찾는다
    User.findOne({email:req.body.email},(err,user)=>{
        if(!user)
        {
            return res.json({
                loginSuccess:false,
                message:"제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
    //이메일이 있다면 비밀번호가 같은지 확인
    user.comparePassword(req.body.password,(err,isMatch)=>{
        if(!isMatch)
            return res.json({loginSuccess:false,message:"비밀번호가 틀렸습니다."})
    })
    //비밀번호 까지 같다면 User를 위한 Token 을 생성
    user.generateToken((err,user)=>{
        if(err) return res.status(400).send(err);//statue(400)이면 error 가 있다는 의미
        //user 에서 받아온 token 을 쿠키에 저장
        res.cookie("x_auth",user.token)//x_auth 라는 이름의 cookie 에 user에 삽입된 token 이 저장됨
            .status(200)//성공했을때
            .json({loginSuccess:true,userId: user._id})//userId 를 user._id 로 
        })
    })
})



app.get('/api/users/auth',auth,(req,res)=>{
    //여기까지 미들웨어를 통과해 왔다는 말은 Auth 가 True 라는 말
    res.status(200).json({
        _id:req.user._id,
        isAdmin: req.user.role===0 ? false : true,//role 이 0 -> 일반유저 , role 이 0이 아니면 관리자
        isAuth:true,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname,
        role:req.user.role,
        image:req.user.image
    })
})


// app.get('api/users/logout',auth,(req,res)=>{//로그인 된 상태이기에 auth 미들웨어를 넣어준다
//     User.findOneAndUpdate({_id:req.user._id},//찾아서 업데이트 해준다
//         {token : ""}//token 을 삭제해주고
//         ,(err,user)=>{
//             if(err) return res.json({success:false, err});//err 발생시 false 메시지, 에러메시지
//             return res.status(200).send({//성공시에
//                 success:true//true 반환
//             })
//         })
// })


app.get('/api/users/logout', auth, (req, res) => {

    // console.log('req.user', req.user)

    User.findOneAndUpdate({ _id: req.user._id },
    { token: "" }
    , (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
    success: true
        })
    })
})



const port = 5000 // localhost:5000
app.listen(port, ()=> console.log(`Example app listening on port ${port}!`))