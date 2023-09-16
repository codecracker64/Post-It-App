import { Button, TextField, Typography } from '@material-ui/core';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { postComment } from '../../actions/posts';


const CommentSection = ({ post }) => {
    // console.log("post ------->",post);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentRef = useRef();
    
    const handleClick =  async() => {
        const finalcomment = `${user.result.name} : ${comment}`;
        const newComment = await dispatch(postComment(finalcomment, post._id));
        setComments(newComment);
        setComment('');

        commentRef.current.scrollIntoView({behaviour:'smooth'});
    };


    return(
        <div className={classes.commentsSection}>
            <div className={classes.comments}>
                <div className = {classes.commentsInnerSection}>   
                    <Typography  gutterBottom variant='h6' >Comments</Typography>
                    {comments.map((c,i) => (
                        <Typography key={i} variant='subtitle1'>
                            <strong>{c.split(': ')[0]}:</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentRef} />
                </div>
            </div>

            {user?.result?.name && (
                <div className={classes.commentInput}>
                <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                <TextField 
                    fullWidth 
                    minRows={2} 
                    variant='outlined' 
                    label='comment'
                    multiline
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                />
                <Button style={{margin:'10px 0'}} variant='contained' disabled={!comment} onClick={handleClick}>comment</Button>
            </div>
            )}
            
        </div>
    );
};

export default CommentSection;