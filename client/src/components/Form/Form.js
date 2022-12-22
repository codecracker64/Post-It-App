import react,{useState, useEffect} from 'react';
import { TextField, Typography, Button, Paper } from '@material-ui/core';
import FileBase from 'react-filebase64';
import {useDispatch, useSelector} from 'react-redux';

import useStyles from './styles';
import {createPost, updatePost} from '../../actions/posts'

const Form = ({currentId , setCurrentId})=>{
    const classes=useStyles();
    const initialState = {creator:"",title:"",message:"",tags:""};
    const [postData,setPostData] = useState(initialState);
    const dispatch = useDispatch();
    const post = useSelector((state)=>  currentId ? state.posts.find( (post) => post._id===currentId) : null);

    
    useEffect(()=> {
        if(post) setPostData(post);
    },[post]);
    

    const handleSubmit = (e)=>{
        e.preventDefault();
        
        if(currentId){
            dispatch(updatePost(currentId, postData));
        } 
        else{
        dispatch(createPost(postData));
        }
        clear();
    }

    const clear = ()=>{
        setPostData(initialState);
        setCurrentId(null);
    }

    return(
        <Paper className={classes.paper}>
            <form onSubmit={handleSubmit} className={`${classes.form} ${classes.root}`}>
                <Typography variant="h6">{currentId ? "Editing" : "Create" } @ Memory</Typography>
                <TextField className={classes.textFeild} name="creator" label="creator" variant="outlined" fullWidth value={postData.creator} onChange={(e)=>setPostData({...postData, creator: e.target.value})}></TextField>
                <TextField className={classes.textFeild} name="title" label="title" variant="outlined" fullWidth value={postData.title} onChange={(e)=> setPostData({...postData, title:e.target.value})}></TextField>
                <TextField className={classes.textFeild} name="message" label="message" variant="outlined" fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message:e.target.value})}></TextField>
                <TextField className={classes.textFeild} name="tags" label="tags" variant="outlined" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags:e.target.value})}></TextField>
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile:base64})}></FileBase>
                </div>
                <Button className={classes.button} variant="contained" color="primary" size="large" type="submit">Submit</Button>
                <Button className={classes.button} variant="contained" color="secondary" size="small" onClick={clear}>Clear</Button>

            </form>
        </Paper>
    )
}

export default Form;