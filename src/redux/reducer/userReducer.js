import { ActionTypes } from "../constants/action-types"

const initialState ={
    userdata:[]
}
export const userReducer =(state = initialState,{type,playload})=>{
switch(type){
    case ActionTypes.SET_USERDATA:
        return {...state,userdata:playload};
        default:
            return state;

}
}