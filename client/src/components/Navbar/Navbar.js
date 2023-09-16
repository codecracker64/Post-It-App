import {useState, useEffect} from 'react';
import { AppBar, Typography, Button, Avatar } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import LogoutIcon from '@mui/icons-material/Logout';

import useStyles from './styles';
import postIt from '../../images/postIt.png';
// import { logOut } from '../../actions/auth';

// console.log("Nav Component Rendered");

const Navbar = () => {
    const classes= useStyles();
    const dispatch = useDispatch();
    // const navigate = useNavigate();
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
        const token = user?.token;

        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime())
                logout();
        }


        setUser(JSON.parse((localStorage.getItem('profile'))));
    }, [location])
    
    return(
    <AppBar className={classes.appBar} position='static' color="inherit">
        <div className={classes.brandContainer}>
            {/* <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Post-IT</Typography> */}
            <Link to="/"><img className={classes.image} src={postIt} alt="memories" height="60"></img></Link>
        </div>
        <div className={classes.userDetails}>
            {user? (
                <div className={classes.loggedInfo}>
                    <Avatar className={classes.avatar} src={user.result.imageUrl}></Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button className={classes.logOutButton} onClick={logout} variant="contained" color="primary">Sign Out</Button>
                    <div className={classes.logOutButtonSmall} onClick={logout}><LogoutIcon/></div>
                </div>
            ):(
                <div className={classes.loggedOutInfo}>
                    <Button className={classes.logInButton} component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                </div>
            )}
        </div>
    </AppBar>
    )
}

export default Navbar;