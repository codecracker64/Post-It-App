import * as api from '../api';
import { FETCH_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST } from '../constants/actionTypes'

export const getPosts = () => async(dispatch) => {
    try{
        const {data} = await api.fetchPosts();
        // console.log(data);

        const action = {type:FETCH_POSTS, payload: data};

        dispatch(action);
    }
    catch (error) {
        console.log(error);
    }
    
    
}

export const createPost = (post) => async(dispatch) => {
    try{
        const {data} = await api.createPost(post);

        const action = {type:CREATE_POST, payload: data};
        dispatch(action);
    }
    catch (error){
         console.log(error);  
    }
}

export const updatePost = (id, post) => async(dispatch) => {
    try{
        const {data} = await api.updatePost(id,post);

        const action = {type:UPDATE_POST, payload: data};
        dispatch(action);
    }
    catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async(dispatch) => {
    try{
        const {data} = await api.deletePost(id);
        const action = {type:DELETE_POST, payload: id};
        dispatch(action);
    }
    catch (error){
        console.log(error);
    }
}

export const likePost = (id) => async(dispatch) => {

    try{
        const {data} = await api.likePost(id);
        console.log("LikePost controller returned: ", data);
        const action = {type:UPDATE_POST, payload:data};
        dispatch(action);
    }
    catch (error) {
        console.log('error in post action: ',error);
    }
}