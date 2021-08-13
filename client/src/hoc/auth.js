import axios from 'axios';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';
export default function (SpecificComponent ,option, adminRoute=null)
{
    //option 에는 세가지 항목이 있다
    //null --> 아무나 출입이 가능한 페이지
    //true --> 로그인한 유저만 출입이 가능한 페이지
    //false --> 로그인한 유저는 출입 불가능한 페이지
    function AuthenticationCheck(props)
    {
        //Back 에 request 를 날려서 상태를 가져온다
        const dispatch=useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response=>{
                if(!response.payload.isAuth)
                {
                    //로그인 하지 않은 상태
                    if(option)
                    {
                        props.history.push('/login')
                    }
                }
                else
                {
                    //로그인 한 상태
                    if(adminRoute&& !response.payload.isAdmin)
                    {
                        props.history.push('/')
                    }
                    else
                    {
                        if(option===false)
                        {
                            props.history.push('/')
                        }
                    }
                }
            })
        }, [])
        return(
            <SpecificComponent/>
        )
    }



    return AuthenticationCheck
}