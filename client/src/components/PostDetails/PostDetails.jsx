import { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom'

import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';
import useStyles from './styles';


// console.log("PostDetails Component Rendered");

const PostDetails = () =>{
    const { post, posts, isLoading } = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const {id} = useParams();

    const recommendedPosts = posts?.filter( ({_id}) => _id !== post?._id );

    useEffect(()=>{
        dispatch(getPost(id));
    },[id]);

    useEffect(()=>{
        dispatch(getPostsBySearch({search: 'none', tags: post?.tags.join(',')}));
        // console.log('getPostsbySearchretured-------->',posts)
    },[post]);

    if(!post){
        return null;
    }

    if(isLoading){
        return <Paper elevation={6} className={classes.loadingPostDetails}><CircularProgress/></Paper>
    }

    

    const openPost = (id)=>navigate(`/posts/${id}`);

    return(
        <Paper className={classes.rootCard} style={{padding:'20px', borderRadius:'15px'}} elevation={6}>
            <div className={classes.card}>
                <div className={`${classes.infoSection} ${classes.root}`}>
                    <Typography variant='h4'>{post.title}</Typography>
                    <Typography variant='subtitle2' color='textSecondary'gutterBottom>{post.tags[0].split(",").map((tag)=> `#${tag.trimStart()} `)}</Typography>
                    <Typography variant='body1' gutterBottom >{post.message}</Typography>
                    <Typography variant='subtitle1'>creator: {post.name}</Typography>
                    <Typography variant='subtitle2'>{moment(post.createdOn).fromNow()}</Typography>
                </div>
                <div className={classes.mediaSection}>
                    <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title}/>
                </div>
            </div>
            <div>
            <Divider style={{margin:'30px 0'}}/>
            <CommentSection post={post} />
            </div>
            {recommendedPosts.length>0 && (
                <>
                <Divider style={{margin:'30px 0'}}/>
                <div className={classes.recommendedPostsSection}>
                    <Typography gutterBottom variant='h5' style={{margin:'0 10px'}}>You might also Like:</Typography>
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts.map(({title, message, name, likes, selectedFile, _id})=>(
                            <div className={classes.recommendedPostsCard} onClick={()=> openPost(_id)} key={_id} >
                                <Typography variant='h6'>{title}</Typography>
                                <Typography variant='subtitle2'>{name}</Typography>
                                <Typography variant='subtitle2'>{message}</Typography>
                                <Typography variant='subtitle2' color='textSecondary'>Likes: {likes.length}</Typography>
                                <img src={selectedFile} width='200px' style={{borderRadius: '15px'}}/>
                            </div>
                        ))}
                    </div>
                </div>
                </>
            )}
        </Paper>
    )
}

export default PostDetails;

