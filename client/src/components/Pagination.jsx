import {useEffect} from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../actions/posts';


// console.log("Pagination Component Rendered");


const Paginate = ({page}) => {
    const dispatch = useDispatch();
    // console.log('page prop in pagination.jsx--->',page);
    const { numberOfPages } = useSelector(state => state.posts);

    useEffect(()=>{
       if(page){
        dispatch(getPosts(page));
       }
    },[page])
    
    return (
        <Pagination
            count ={numberOfPages}
            page = {Number(page) || 1}
            variant='text'
            color={'primary'}
            size='large'
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts/?page=${item.page}`} />
            )}
        />
    )
}

export default Paginate;