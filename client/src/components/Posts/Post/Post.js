import {useState} from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase} from '@material-ui/core';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
// import { useEffect } from 'react';

import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';
import posts from '../../../reducers/posts';


// console.log("Post Component Rendered");


const Post = ({post, setCurrentId})=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [likes,setLikes] = useState(post?.likes);
    
    const user = JSON.parse(localStorage.getItem('profile'));
 
    //To improve faster user feedback, we use useState for likes.

    // const Likes = () => {
    //     const likeCount = post.likes.length;
    //     console.log('Likes Fn in Post Component, likeCount: ', likeCount );
    //     if(likeCount > 0) {
    //         return post.likes.find((like) => like == (user?.result?.googleId || user?.result?._id))
    //         ? (
    //             <><ThumbUpAltIcon fontSize='small' /> &nbsp; { likeCount> 2 ? `You and ${likeCount-1} others` : `${likeCount} Likes`} </>
    //         ) : (
    //             <><ThumbUpAltOutlinedIcon fontSize='small' /> &nbsp; {likeCount} {likeCount == 1 ? 'Like' : 'Likes'} </>
    //         )
    //     }
    //     return <><ThumbUpAltOutlinedIcon fontSize='small' />&nbsp;Like</>
    // }

    const userId = user?.result?.googleId || user?.result?._id;
    const hasLikedPost = likes.find( like => like == userId);

    const handleLike = ()=>{
        
        dispatch(likePost(post._id));

        hasLikedPost ? setLikes(likes.filter( like => like !== userId)) : setLikes([...likes, userId]);
    }

    const Likes = () => {
        const likeCount = likes.length;
        if(likeCount>0){
            return hasLikedPost ? 
            (<><ThumbUpAltIcon fonstSize='small' /> &nbsp; { likeCount > 2 ? `You and ${likeCount-1} others` : `${likeCount} Like${likeCount==1? 's':''}` }  </>)
            : (<><ThumbUpAltOutlinedIcon fonstSize='small' /> &nbsp; {likeCount} {likeCount == 1 ? 'Like' : 'Likes'} </>)

        }
        return <><ThumbUpAltOutlinedIcon fontSize='small' /> &nbsp;Like</>
    } 
    
    
    const openPost = () => navigate(`/posts/${post._id}`);
    
    // console.log("post here-------------->",post);
    return(
        <Card className={`${classes.root}  ${classes.Card}`}>
            
            <ButtonBase component='span' onClick={openPost} className={classes.cardAction}>
                <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title}/>
                             
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography> 
                    <Typography variant="body2">{moment(post.createdOn).fromNow()}</Typography>
                </div>
                
                {(user?.result?.googleId == post.creator || user?.result?._id == post.creator) && (
                <div className={classes.overlay2}>
                    <Button style={{color:'white'}} size="small" onClick={(e)=>{e.stopPropagation(); setCurrentId(post._id)}}>
                        <MoreHorizIcon/>
                    </Button>
                </div>
                )}

                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag)=> `#${tag.trim().replace('#','')} `)}</Typography>
                </div>

                <Typography className={classes.title} variant="h5">{post.title}</Typography>
                
                <CardContent>
                    <Typography variant="body2" color="textSecondary" gutterBottom>{ post.message.length > 150 ? post.message.substring(0,150) + '...' : post.message}</Typography>
                </CardContent>
            </ButtonBase>
            
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={ handleLike }>
                    <Likes />
                </Button>
                {(user?.result?.googleId == post.creator || user?.result?._id == post.creator) && (
                    <Button size="small" color="secondary" onClick={ () => dispatch(deletePost(post._id,navigate)) }>
                        <DeleteIcon fontSize="small"/>
                        <div>Delete</div>
                    </Button>
                )}              
            </CardActions>
        </Card>
    )
}

export default Post;