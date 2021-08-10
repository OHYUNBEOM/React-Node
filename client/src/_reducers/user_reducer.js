import{
    LOGIN_USER
}from '../_actions/types';
export default function(state={},action)
{
    switch (action.type) {
        case LOGIN_USER:
                return { ...state, loginSuccess: action.payload}
                break;
    
        default:
            return state;
    }
}
//Login 의 성공/실패 여부