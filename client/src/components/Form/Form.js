import {useState, useEffect} from 'react';
import { TextField, Typography, Button, Paper } from '@material-ui/core';
import FileBase from 'react-filebase64';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';


import useStyles from './styles';
import {createPost, updatePost} from '../../actions/posts'
import ChipInput from 'material-ui-chip-input';

// console.log("Form Component Rendered");

const Form = ({currentId , setCurrentId})=>{
    // console.log("Form function called");
    
    const classes=useStyles();
    const initialState = {title:"",message:"",tags:[],selectedFile:""};
    const [postData,setPostData] = useState(initialState);
    const dispatch = useDispatch();
    const post = useSelector((state)=> (currentId) ? state.posts?.posts?.find( (post) => post._id===currentId) : null);
    // console.log("post----------->",post)
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate= useNavigate();
    
    useEffect(()=> {
        // console.log("UseEffect in Form component Called");
        if(post) setPostData(post);
    },[post]);
    
    const handleAdd = (tag) => setPostData({...postData, tags:[...postData.tags, tag]});

    const handleDelete = (tagToDelete) => setPostData({...postData, tags:postData.tags.filter(tag=> tag!==tagToDelete)});

    const handleSubmit = (e)=>{
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
        } 
        else{
        dispatch(createPost({...postData, name: user?.result?.name}, navigate));
        }
        clear();
    } 
    
    const clear = ()=>{
        setPostData(initialState);
        setCurrentId(null);
    }



    return(
        <Paper className={`${classes.paper} ${classes.root}`} elevation={6}>
            { user? 
            <form onSubmit={handleSubmit} className={classes.form}>
                <Typography variant="h6">{currentId ? "Editing" : "Create" } @ Memory</Typography>
                {/* <TextField className={classes.textFeild} name="creator" label="creator" variant="outlined" fullWidth value={postData.creator} onChange={(e)=>setPostData({...postData, creator: e.target.value})}></TextField> */}
                <TextField className={classes.textFeild} name="title" label="title" variant="outlined" fullWidth value={postData.title} onChange={(e)=> setPostData({...postData, title:e.target.value})}></TextField>
                <TextField className={classes.textFeild} name="message" label="message" variant="outlined" fullWidth multiline value={postData.message} onChange={(e) => setPostData({...postData, message:e.target.value})}></TextField>
                {/* <TextField className={classes.textFeild} name="tags" label="tags" variant="outlined" fullWidth placeholder="tag , tag , tag" value={postData.tags} onChange={(e) => setPostData({...postData, tags:e.target.value})}></TextField> */}
                <ChipInput
                    fullWidth 
                    style={{margin: '10px 0'}}
                    variant='outlined'
                    label='Search Tags'
                    value={postData.tags}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile:base64})}></FileBase>
                </div>
                <Button className={classes.button} variant="contained" color="primary" size="large" type="submit">Submit</Button>
                <Button className={classes.button} variant="contained" color="secondary" size="small" onClick={clear}>Clear</Button>

            </form> :
            <Typography>Please Sign in to create your own memories</Typography>}
        </Paper>
    )
}

export default Form;