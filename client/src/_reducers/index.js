import { combineReducers } from "redux"; // Store 공간에 여러가지 Reducer 등이 있음 즉 User 에 대한 state 등등등 있는데 CombineReducer 을 이용해 여러가지 reducer를 합치는 역할
import user from'./user_reducer';

const rootReducer = combineReducers({
    user
})

export default rootReducer;