import react, {useState, useEffect} from 'react';
import { Grow, Grid, Container } from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';


import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPosts } from '../../actions/posts';



const Home = () => {
    const [currentId, setCurrentId] = useState(null);

    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'));
    console.log('user in Home Component - ',user);

    const auth = useSelector((state) => state.auth);

    useEffect(()=>{
        dispatch(getPosts());
        console.log("dispatch in Home component called")
     },[currentId,dispatch,auth])

    return(
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
    )
}

export default Home;