import {FETCH_POST, FETCH_POSTS, FETCH_BY_SEARCH, CREATE_POST, UPDATE_POST, DELETE_POST, START_LOADING, END_LOADING, COMMENT_POST} from '../constants/actionTypes';   

export default (state = { isLoading: true, posts: [] }, action) => {
    // console.log("state==",state);
    // console.log("action==",action);
    switch(action.type){
        case START_LOADING:
            return { ...state, isLoading: true};

        case END_LOADING:
            return { ...state, isLoading: false};

        case FETCH_POST:
            // console.log("ACTION---------------",action)
            return{ ...state, post:action.payload};
        
        case FETCH_POSTS:
            return { ...state, posts: action.payload.data, currentPage: action.payload.currentPage, numberOfPages: action.payload.numberOfPages};

        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload.data};
        
        case CREATE_POST:
            return { ...state, posts: [...state.posts, action.payload] };
        
        case UPDATE_POST:
            return { ...state, posts: state.posts.map((post) => post._id==action.payload._id ? action.payload : post) };    
        
        case DELETE_POST:
            return { ...state, posts: state.posts.filter((post) => (post._id!==action.payload)) };
        
        case COMMENT_POST:
            return{ ...state, posts: state.posts.map( post => {
                if(post._id == action.payload._id) return action.payload;
                return post;
            })};
            
        default:
            return state;
    }
}