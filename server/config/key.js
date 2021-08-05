if(process.env.NODE_ENV==='production'){
    module.exports=require('./prod');
}
else
{
    module.exports=require('./dev');
}
//process.env.NODE_ENV : 환경변수의 의미인데 그것이 production 즉 배포 한 이후라면 if 내부로
//local 의 환경이라면 else 의 내부로 사용