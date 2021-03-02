import axios from 'axios';
import { returnErrors } from './errorActions';
import AsyncStorage from '@react-native-community/async-storage';
import { 
    USER_LOADING,
    USER_LOADED,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    url
} from "./types";

export const makeConfig = async (type) => {
    const token = await AsyncStorage.getItem('userToken');
    // console.log(token)
    const config = {
        headers: {
            'content-type' : type,
            auth: token
        }
    }
    return config;
};

export const register = (username, email, password) => {

    return (dispatch, getState) => {

            const config = {
            headers : {
                'Content-type' : 'Application/json'
            }
        }
    
        const body = JSON.stringify({
            username,
            email,
            password
        })

        axios.post(`${url}/users/register`, body , config )
        .then(res => dispatch({
            type : REGISTER_SUCCESS,
            payload : res.data 
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, REGISTER_FAIL));
            dispatch({
                type : REGISTER_FAIL
            })

    });
};
}

export const login = (email, password,ip) => {
    return (dispatch, getState) => {

        dispatch({
            type : USER_LOADING,
        })

        const config = {
            headers : {
                'Content-type' : 'Application/json'
            }
        }
    
        const body = JSON.stringify({
            email,
            password,
            ip
        })

        axios.post(`${url}/user/login`, body , config)
        .then(res => 
            dispatch ({
                type : LOGIN_SUCCESS,
                payload : res.data
        }))
        .catch(err =>{
            dispatch(returnErrors(err.response.data,err.response.status, LOGIN_FAIL));
            dispatch({
                type: LOGIN_FAIL
            })
        });
    };
}


export const logout = () => {
    return {
        type : LOGOUT_SUCCESS
    }
}

export const loadUser = (token) => {
    return (dispatch, getState) => {
        
        dispatch({
            type: USER_LOADING,
        });

        const config = {
            headers : {
                'content-type' : 'Application/json',
                'auth' : token
            }
        }

        axios.get(`${url}/user/auth` , config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload : res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type : AUTH_ERROR
            });
        })
    }
}


//
export const tokenConfig = async (getState) => {

    const token = await AsyncStorage.getItem('userToken');

    const config = {
        headers : {
            'content-type' : 'Application/json',
        }
    }

    if(token) {
        config.headers['auth'] = token;
    }

    return config;
} 