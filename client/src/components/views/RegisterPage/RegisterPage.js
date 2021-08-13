import React ,{useState} from 'react'
import {useDispatch} from 'react-redux'
import { registerUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';

function RegisterPage(props) {

    const dispatch=useDispatch();

    const [Email, setEmail] = useState("")//타이핑을 할 때 다음과같은 Email 이라는 state 를 바꿔주면 value 가 변경되는 로직
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler=(event)=>{//onchange 이벤트로 onEmailHandler 라는 Function을 생성
        setEmail(event.currentTarget.value)//setEmail을 event.currentTarget.value 즉 가장 최근 일어난 target 의 value 값으로 지정
    }

    const onNameHandler=(event)=>{
        setName(event.currentTarget.value)
    }
    
    const onPasswordHandler=(event)=>{
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler=(event)=>{
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler=(event)=>{
        event.preventDefault();

        if(Password!==ConfirmPassword)
        {
            return alert('비밀번호 불일치')
        }

        let body={
            email:Email,
            password:Password,
            name: Name
        }

        dispatch(registerUser(body))//redux 를 사용하기때문에 
            .then(response=>{
                if(response.payload.success)
                {
                    props.history.push("/login")
                }
                else
                {
                    alert('회원가입 실패')
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

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br/>
                <button>
                    회원가입
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
