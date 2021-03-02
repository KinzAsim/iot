import { tokenConfig } from './authActions';
import axios from 'axios';
import { returnErrors } from './errorActions';
import { 
    USER_LOADING,
    GET_USERS,
    EDIT_SUCCESS,
    EDIT_FAIL,
    url
} from "./types";
//import {REACT_APP_URL} from 'react-native-dotenv';

export const getUsers = () => {

    return (dispatch, getState) => {

        dispatch({
            type : USER_LOADING
        })

        axios.get(`${url}/users/`, tokenConfig(getState) )
        .then(res => dispatch({
            type : GET_USERS,
            payload : res.data
        }))
        .catch(err => {
        });
    }
};


export const editUserDetails = ({
    username,
    name,
    email,
    address,
    password
    } , id) => {
    return (dispatch, getState) => {

            const config = {
            headers : {
                'Content-type' : 'Application/json'
            }
        }    
        const body = JSON.stringify({
            username,
            name,
            email,
            address,
            password
            
        })
        
        axios.post(`${url}/users/update/${id}`, body , config )
        .then(res => dispatch({
            type : EDIT_SUCCESS,
            payload : res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, EDIT_FAIL));
            dispatch({
                type : EDIT_FAIL
            })
    });
};
}
