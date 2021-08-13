import React,{ useEffect} from 'react'
import axios from 'axios';
import {withRouter} from 'react-router-dom';

function LandingPage(props) {//function LandingPage --> LandingPage 에 들어오자마자 함수 내부의 것을 실행한다는 말
    useEffect(() => {
        axios.get('/api/hello')
        .then(response=>console.log(response.data))
    }, [])
//axios.get('/api/hello')--> get 을 통해서 server로 보낸다(EndPoint:/api/hello)

    const onClickHandler= () => {
        axios.get(`/api/users/logout`)
        .then(response=>{
            if(response.data.success)
            {
                props.history.push("/login")//history.push 를 쓰려면 리액트 라우더 돔을 이용해서 쓰고있기에 import {withRouter} from 'react-router-dom'; 와 export default withRouter(LandingPage) 이런식으로 감싸줘야 사용 가능하다
            }
            else
            {
                alert('!Logout Faild!')
            }
        })
    }

    return (
        <div style={{
            display:'flex',justifyContent:'center',alignItems:'center'
            ,width:'100%',height:'100vh',flexDirection:'column'
        }}>
            <h2>Starting Page</h2>
            <button onClick={onClickHandler}>
                Logout
            </button>
        </div>

        
    )
}

export default withRouter(LandingPage)
