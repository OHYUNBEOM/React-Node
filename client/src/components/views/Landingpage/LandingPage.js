import React,{ useEffect} from 'react'
import axios from 'axios';

function LandingPage() {//function LandingPage --> LandingPage 에 들어오자마자 함수 내부의 것을 실행한다는 말
    useEffect(() => {
        axios.get('/api/hello')
        .then(response=>console.log(response.data))
    }, [])
//axios.get('/api/hello')--> get 을 통해서 server로 보낸다(EndPoint:/api/hello)
    return (
        <div style={{
            display:'flex',justifyContent:'center',alignItems:'center'
            ,width:'100%',height:'100vh'
        }}>
            <h2>Starting Page</h2>
        </div>
    )
}

export default LandingPage
