import * as api from '../api';
import { FETCH_POST, FETCH_POSTS, FETCH_BY_SEARCH, CREATE_POST, UPDATE_POST, DELETE_POST, START_LOADING, END_LOADING, COMMENT_POST } from '../constants/actionTypes'


export const getPost = (id) => async(dispatch) => {
    try{
        dispatch({type:START_LOADING});

        const {data} = await api.fetchPost(id);
        const action = {type:FETCH_POST, payload: data};

        dispatch(action);
        dispatch({type:END_LOADING});
    }
    catch(error){
        console.log(error);
    }
}


export const getPosts = (page) => async(dispatch) => {
    try{
        dispatch({type:START_LOADING});
        
        const {data} = await api.fetchPosts(page);
        // console.log("data received from backend----->",data);
        const action = {type:FETCH_POSTS, payload: data};

        dispatch(action);
        dispatch({type: END_LOADING});
    }
    catch (error) {
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async(dispatch) =>{
    try{
        dispatch({type:START_LOADING});

        const {data} = await api.fetchPostsBySearch(searchQuery);
        const action = {type:FETCH_BY_SEARCH, payload: data};
        
        dispatch(action);
        dispatch({type: END_LOADING});

    }
    catch(error){
        console.log(error);
    }
}

export const createPost = (post,navigate) => async(dispatch) => {
    try{
        const {data} = await api.createPost(post);

        const action = {type:CREATE_POST, payload: data};
        dispatch(action);
        navigate('/');
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

export const deletePost = (id,navigate) => async(dispatch) => {
    try{
        // const {data} = await api.deletePost(id);
        await api.deletePost(id);
        const action = {type:DELETE_POST, payload: id};
        dispatch(action);
        navigate('/');
    }
    catch (error){
        console.log(error);
    }
}

export const likePost = (id) => async(dispatch) => {

    try{
        const {data} = await api.likePost(id);
        // console.log("LikePost controller returned: ", data);
        const action = {type:UPDATE_POST, payload:data};
        dispatch(action);
    }
    catch (error) {
        console.log('error in post action: ',error);
    }
}

export const postComment = (value, id) => async(dispatch) =>{
    try{
        const {data} = await api.postComment(value,id);
        dispatch({type:COMMENT_POST,payload:data});
        return data.comments;
    }
    catch(error){
        console.log('error');
    }
}