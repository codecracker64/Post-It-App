import {useState} from 'react';
import { Grow, Grid, Container, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';
import { useLocation, useNavigate} from 'react-router-dom'


import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import Paginate from '../Pagination';
import ChipInput from 'material-ui-chip-input';

// console.log("Home component Rendered");

function useQuery() {
    return new URLSearchParams(useLocation().search)
}



const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes=useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query= useQuery();
    const page = query.get('page') || 1; //('page')
    const searchQuery=query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const user = JSON.parse(localStorage.getItem('profile'));

    const auth = useSelector((state) => state.auth);

    // useEffect(()=>{
    //     dispatch(getPosts());
    //     console.log("dispatch in Home component called")
    //  },[currentId,dispatch,auth])

     const handleKeypress = (e)=>{
      if(e===13){
        SearchPost();
      }
     }

     const handleAdd = (tag) => setTags([...tags, tag.trim()]);

     const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag!==tagToDelete));

     const SearchPost = ()=>{
        // console.log("tags to search--------------->",tags.join(',')); 
        if(search.trim() || tags){
            if(tags =='') dispatch(getPostsBySearch({search}));
            else dispatch(getPostsBySearch({search, tags: tags.join(',')})); //we can't pass array though URL parameters so we pass as a string
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }
        else{
            navigate('/');
        }
     }

    return(
    <Grow in>
        <Container maxWidth="xl">
            <Grid container justifyContent="space-between" alignItems='stretch' spacing={3}>
                <Grid item xs={12} sm={6} md={8} lg={9}>
                    <Posts setCurrentId={setCurrentId}/>    
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                        <TextField
                            name='search' 
                            variant='outlined' 
                            fullWidth 
                            label='Search Memories'
                            value={search}
                            onChange={(e)=> setSearch(e.target.value)}
                            onKeyPress={handleKeypress}/>
                        <ChipInput
                            style={{margin: '10px 0'}}
                            variant='outlined'
                            label='Search Tags'
                            value={tags}
                            onAdd={handleAdd}
                            onDelete={handleDelete}
                        />
                        <Button onClick={SearchPost} color='primary' variant='contained'>
                            Search
                        </Button>
                    </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    { (!searchQuery && !tags.length) && (
                        <Paper elevation={6} className={classes.paper}> 
                            <Paginate page={page} className={classes.paginate}/>
                        </Paper>
                    )}
                </Grid>
            </Grid>    
        </Container>
    </Grow>
    )
}

export default Home;