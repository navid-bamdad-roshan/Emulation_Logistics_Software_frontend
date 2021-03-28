import {LOGIN, LOGOUT} from './types';

export function login(username, jwtToken){
    return function (dispatch){
        dispatch({
            type: LOGIN,
            payload: {
                username: username,
                jwtToken: jwtToken
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