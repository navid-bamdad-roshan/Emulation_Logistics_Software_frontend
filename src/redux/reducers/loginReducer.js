import {LOGIN, LOGOUT} from '../actions/types';

const initialState = {
    user: {
        username: "",
        JwtToken: ""
    }
}

function login (state=initialState, action){
    switch(action.type){
        case LOGIN:
            return {user: action.payload}
        case LOGOUT:
            return {user: initialState}
        default:
            return state
    }
};

export default login