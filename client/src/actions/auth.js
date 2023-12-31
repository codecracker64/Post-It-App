import { AUTH } from '../constants/actionTypes'
import * as api from '../api/index';


export const signIn = (formData, navigate) => async(dispatch) => {
    try{
        const { data } = await api.signIn(formData);
        dispatch({type: AUTH, data});
        navigate('/');
    }
    catch(error){
        console.log(error);
        return error;
    }
}

export const signUp = (formData, navigate) => async(dispatch) => {
    try{
        const { data } = await api.signUp(formData);
        dispatch({type: AUTH, data});
        navigate('/');
    }
    catch(error){
        console.log(error);
    }
}

// export const logOut = (navigate, setUser) => async(dispatch) => {
//     try{
//         dispatch({ type: 'LOGOUT' });
//         navigate('/');
//         setUser(null);
//     }
//     catch(error){
//         console.log(error);
//    }
//}