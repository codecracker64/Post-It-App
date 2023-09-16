import Post from './Post/Post';
import {useSelector} from 'react-redux';
import {Grid, Typography, CircularProgress} from '@material-ui/core';


// console.log("Posts component Rendered");


const Posts = ({setCurrentId})=>{
    
    const { posts, isLoading } = useSelector((state)=> state.posts);

    if( !posts.length && !isLoading) return <Typography>No memories yet, let's add one now.</Typography>;

    return(
        isLoading ? <CircularProgress/>  : (
            <Grid container spacing={3}>
                {
                posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                
                ))
            }
            </Grid>     
        )
    )
};

export default Posts;