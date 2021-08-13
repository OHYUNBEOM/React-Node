import axios from 'axios'
import React ,{useState} from 'react'
import {useDispatch} from 'react-redux'
import { loginUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';

function LoginPage(props) {

    const dispatch=useDispatch();

    const [Email, setEmail] = useState("")//타이핑을 할 때 다음과같은 Email 이라는 state 를 바꿔주면 value 가 변경되는 로직
    const [Password, setPassword] = useState("")

    const onEmailHandler=(event)=>{//onchange 이벤트로 onEmailHandler 라는 Function을 생성
        setEmail(event.currentTarget.value)//setEmail을 event.currentTarget.value 즉 가장 최근 일어난 target 의 value 값으로 지정
    }

    const onPasswordHandler=(event)=>{
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler=(event)=>{
        event.preventDefault();//이 code 가 없을때 login 버튼 클릭시에 계속해서 페이지 자체가 새로고침이 되는데 이를 막기위함
        let body={
            email:Email,
            password:Password
        }

        dispatch(loginUser(body))//redux 를 사용하기때문에 
            .then(response=>{
                if(response.payload.loginSuccess){
                    props.history.push('/')//props.history/push 를 이용해서 페이지 이동
                }
                else
                {
                    alert('Error')
                }
            })
    }

    return (
        <div style={{
            display:'flex',justifyContent:'center',alignItems:'center'
            ,width:'100%',height:'100vh'
        }}>

            <form style={{display:'flex',flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br/>
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
