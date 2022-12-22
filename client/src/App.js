import react, {useEffect, useState} from 'react';
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux'; 

import memories from './images/memories.png';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles';
import { getPosts } from './actions/posts';

export default function App() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);
    const posts = useSelector((state)=> state.posts);

    useEffect(()=>{
       dispatch(getPosts());
    },[currentId,dispatch])
    
    return(
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position='static' color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60"></img>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems='stretch'>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>    
                        </Grid> 
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>    
                </Container>
            </Grow>
        </Container>
    )
}