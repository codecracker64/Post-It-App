import react, {useState, useEffect} from 'react';
import { AppBar, Typography, Button, Avatar } from '@material-ui/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import memories from '../../images/memories.png';
// import { logOut } from '../../actions/auth';



const Navbar = () => {
    const classes= useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    // console.log('This came from Navbar component, user',user);
    // console.log('location: ',location)
    

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        // navigate("/");
        setUser(null);
        // dispatch(logOut(navigate, setUser));
    }

    useEffect(()=>{
        setUser(JSON.parse((localStorage.getItem('profile'))));
    }, [location])
    
    return(
    <AppBar className={classes.appBar} position='static' color="inherit">
        <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
            <img className={classes.image} src={memories} alt="memories" height="60"></img>
        </div>
        <div>
            {user? (
                <div>
                    <Avatar src={user.result.imageUrl}></Avatar>
                    <Typography variant="h6">{user.result.name}</Typography>
                    <Button onClick={logout} variant="contained" color="primary">Sign Out</Button>
                </div>
            ):(
                <div>
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                </div>
            )}
        </div>
    </AppBar>
    )
}

export default Navbar;