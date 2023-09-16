import {useState} from 'react';
import { Container, Paper, Typography, Avatar, Button, Grid  } from '@material-ui/core';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import {gapi} from 'gapi-script';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';


import useStyles from './styles';
import Input from './Input';
import { signIn, signUp } from '../../actions/auth';

// console.log("Auth Component Rendered");


export default function Auth(){
    const classes=useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialState = { firstName: '', lastName: '', email: '', password:'', confirmPassword:'' };

    const [isSignup, setSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    const handleShowPassword = () => setShowPassword((prev)=>!prev);
    const switchSignInSignUp = () => setSignUp((prev)=>!prev);

    const validateEamil = (e) =>{
        if(e.target.value==''){
            setIsValidEmail(true)
            return;
        }
        setIsValidEmail(emailRegex.test(e.target.value));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(isSignup){
            dispatch(signUp(formData, navigate));
        }

        else{
            const {response:{data: {message}}} = await dispatch(signIn(formData, navigate));
            setErrorMessage(message);
            // console.log("errorMessage-->",message);
        }
        
    }

    const handleChange = (e) => {
        setFormData( { ...formData, [e.target.name]:e.target.value });
    }

    const googleSuccess = async (res) => {
        // console.log(res)
        const result = res?.profileObj;
        const token = res?.tokenId;

        try{
            dispatch({type: 'AUTH', data:{ result, token}})

            navigate('/');
        }
        catch(error){
            console.log(error)
        }
        
    }

    const googleFailure = (res) => console.log(res);


    window.gapi.load('client:auth2', ()=>{
        window.gapi.client.init({
            clientId: "238048892600-smqhlvi6irjguetnac432585p1e5a3tm.apps.googleusercontent.com",
            plugin_name: "chat"
        })
    })

    return(
        <Container maxWidth="sm">
            <Paper className={classes.paper} elevation={20}>
                <Avatar>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography>{isSignup? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid className={classes.grid} container spacing={2}>
                        { isSignup && (
                            <>
                                <Input name="firstName" label="First Name" half={true} handleChange={handleChange}/>
                                <Input name="lastName" label="Last Name" half={true} handleChange={handleChange}/>
                            </>
                        )}
                        <Input name="email" label="E-mail" handleChange={handleChange} validateEamil={validateEamil} isValidEmail={isValidEmail}/>
                        <Input name="password" label="password" type= {showPassword? "text" : "password"} handleShowPassword={handleShowPassword} handleChange={handleChange}/>
                        {isSignup && (
                            <>
                                <Input name="confirmPassword" label="confirm password" type="password" handleChange={handleChange}/>
                            </>
                        )}
                        { errorMessage && (
                            <Typography color='secondary' style={{fontSize:'0.8rem',margin:'0 10px'}}>{errorMessage}</Typography>
                        )}
                    </Grid>
                    <Button disabled={!isValidEmail} className={classes.button} fullWidth type="submit" variant="contained" color="primary">{isSignup ? "Sign Up" : "Sing In"}</Button>
                    <GoogleLogin
                        clientId="238048892600-smqhlvi6irjguetnac432585p1e5a3tm.apps.googleusercontent.com"
                        render={renderProps => (
                        <Button color="primary" fullWidth variant="contained" onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Button fullWidth onClick={switchSignInSignUp}>{isSignup ? "Have an account? Sign In" : "Don't have an account? Sign Up"}</Button>
                </form>
            </Paper>
        </Container>
    )
};