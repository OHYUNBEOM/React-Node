const mongoose=require('mongoose');
const bcyrpt = require('bcrypt');
const saltRounds = 10;


const userSchema=mongoose.Schema({
    name:{
        type:String,
        maxlength: 50
    },
    email:{
        type:String,
        trim:true,
        unique:1//똑같은 이메일을 쓸 수 없도록 unique 로 설정
    },
    password:{
        type:String,
        minlength: 5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{//사용자, 관리자를 판단
        type:Number,
        default:0//기본값으로 0
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
})

userSchema.pre('save', function(next){//index 의 user.save 전에 무엇을 한다는 뜻 
    var user=this;
    if(user.isModified('password'))//password가 변환될때만 실행시키겠다
    {
        //비밀번호를 암호화 시킨다
        bcyrpt.genSalt(saltRounds,function(err,salt){
        if(err) return next(err)
        bcyrpt.hash(user.password, salt, function(err,hash){//구글링하면 함수형태 다 나옴
            if(err) return next(err)
            user.password=hash // 기존에 user.password 즉 사용자가 입력한 비밀번호를 hash 즉 암호화된 비밀번호로 변경해주는것
            next()
        })
    })
    }
    else
    {
        next()
    }
})


userSchema.methods.comparePassword=function(plainPassword,cb){
    //plainpassword --> 1234567 와 암호화된 비밀번호가 같은지 확인 / 기존 비밀번호를 암호화 시켜서 확인
    bcyrpt.compare(plainPassword,this.password,function(err,isMatch){//기존 password와 비교해서 
        if(err) return cb(err),//다르면 err 메시지 출력
        cb(null,isMatch)//같으면 cb(callbackfunction)에 err가 없으니 null 을 주고, isMatch 즉 true란 말
    })
}


const User=mongoose.model('User',userSchema)

module.exports={ User }