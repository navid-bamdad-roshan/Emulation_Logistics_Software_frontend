import {LOGIN, LOGOUT} from './types';

export function login(username, JwtToken){
    return function (dispatch){
        dispatch({
            type: LOGIN,
            payload: {
                username: username,
                JwtToken: JwtToken
            }
        })
    }
};

export function logout(){
    return function (dispatch){
        dispatch({
            type: LOGOUT,
            payload: {}
        })
    }
};