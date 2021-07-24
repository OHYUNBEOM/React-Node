const mongoose=require('mongoose');

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
const User=mongoose.model('User',userSchema)

module.exports={ User }