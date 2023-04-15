import react, { useEffect } from 'react';
import Post from './Post/Post';
import {useSelector} from 'react-redux';
import {Grid, Typography} from '@material-ui/core';

const Posts = ({setCurrentId})=>{

    const posts = useSelector((state)=> {console.log("states in Posts component: ", state);
                return state.posts;
            });

    return(
        !posts.length ? <Typography>No memories yet, let's add one now.</Typography> : (
            <Grid container spacing={3}>
                {
                posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                
                ))
            }
            </Grid>     
        )
    )
};

export default Posts;