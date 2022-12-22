import react from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import {useDispatch} from 'react-redux';

import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({post, setCurrentId})=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    

    return(
        <Card className={classes.Card}>
            
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography> 
                <Typography variant="body2">{moment(post.createdOn).fromNow()}</Typography>
            </div>
            
            <div className={classes.overlay2}>
                <Button style={{color:'white'}} size="small" onClick={()=> setCurrentId(post._id)}>
                    <MoreHorizIcon/>
                </Button>
            </div>
            
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag)=> `#${tag} `)}</Typography>
            </div>

            <Typography className={classes.title} variant="h5">{post.title}</Typography>
            
            <CardContent>
                <Typography variant="body2" color="textSecondary" gutterBottom>{post.message}</Typography>
            </CardContent>
            
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={ () => dispatch(likePost(post._id)) }>
                    <ThumbUpAltIcon fontSize="small"/>
                     &nbsp; {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={ () => dispatch(deletePost(post._id)) }>
                    <DeleteIcon fontSize="small"/>
                    <div>Delete</div>
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post;