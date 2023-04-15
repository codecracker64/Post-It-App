import React from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import {useDispatch} from 'react-redux';
// import { useEffect } from 'react';
// import {useNavigate} from 'react-router-dom'

import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({post, setCurrentId})=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    
    const user = JSON.parse(localStorage.getItem('profile'));
 
    const Likes = () => {
        const likeCount = post.likes.length;
        console.log('this is from likes function in Post Component, likeCount: ', likeCount );
        if(likeCount > 0) {
            return post.likes.find((like) => like == (user?.result?.googleId || user?.result?._id))
            ? (
                <><ThumbUpAltIcon fontSize='small' /> &nbsp; { likeCount> 2 ? `You and ${likeCount-1} others` : `${likeCount} Likes`} </>
            ) : (
                <><ThumbUpAltOutlinedIcon fontSize='small' /> &nbsp; {likeCount} {likeCount == 1 ? 'Like' : 'Likes'} </>
            )
        }

        return <><ThumbUpAltOutlinedIcon fontSize='small' />&nbsp;Like</>
    }

    return(
        <Card className={classes.Card}>
            
            <CardMedia component='img' className={classes.media} image={post.selectedFile} title={post.title} />
            
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography> 
                <Typography variant="body2">{moment(post.createdOn).fromNow()}</Typography>
            </div>
            
            {(user?.result?.googleId == post.creator || user?.result?._id == post.creator) && (
            <div className={classes.overlay2}>
                <Button style={{color:'white'}} size="small" onClick={()=> setCurrentId(post._id)}>
                    <MoreHorizIcon/>
                </Button>
            </div>
            )}

            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags[0].split(",").map((tag)=> `#${tag.trimStart()} `)}</Typography>
            </div>

            <Typography className={classes.title} variant="h5">{post.title}</Typography>
            
            <CardContent>
                <Typography variant="body2" color="textSecondary" gutterBottom>{post.message}</Typography>
            </CardContent>
            
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={ () => dispatch(likePost(post._id)) }>
                    <Likes />
                </Button>
                {(user?.result?.googleId == post.creator || user?.result?._id == post.creator) && (
                    <Button size="small" color="primary" onClick={ () => dispatch(deletePost(post._id)) }>
                        <DeleteIcon fontSize="small"/>
                        <div>Delete</div>
                    </Button>
                )}              
            </CardActions>
        </Card>
    )
}

export default Post;