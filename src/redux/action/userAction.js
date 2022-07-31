import {ActionTypes} from '../constants/action-types'
export const setuserdata =(userdata)=>{
    return {
        type:ActionTypes.SET_USERDATA,
        playload:userdata,
    }
}