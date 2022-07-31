import {combineReducers} from 'redux';
import {userReducer} from "./userReducer"


const reducer = combineReducers({
    allUserData:userReducer,
})

export default reducer;