import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
}from './types';
export function loginUser(dataToSubmit){
    const request=axios.post('/api/users/login',dataToSubmit) // 입력한 email 과 password 를 받아와서 body 에다 받고, 그 body 를 axios 를 통해서 .post(서버로 보내줌)
        .then(response => response.data)//서버에서 받은 데이터를 request 에 저장한다
    
    //server 부분 index.js 에 만들어놓은 login,register,logout 등등 사용
    return{
        type: LOGIN_USER,
        payload: request//request 를 payload 에 넣어서 request 가 가져온 모든 data 이기에 모든 데이터가 redux 에 들어감
    }
}

export function registerUser(dataToSubmit){
    const request=axios.post('/api/users/register',dataToSubmit) //server 폴더 index.js 의 Endpoint 를 맞춰준다
        .then(response => response.data)
    
    
    return{
        type: REGISTER_USER,
        payload: request
    }
}

export function auth(){
    const request=axios.get('/api/users/auth') //server 폴더 index.js 의 Endpoint 를 맞춰준다
        .then(response => response.data)
    
    
    return{
        type: AUTH_USER,
        payload: request
    }
}

