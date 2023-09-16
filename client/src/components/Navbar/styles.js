import { makeStyles } from '@material-ui/core';

export default makeStyles((theme)=>({

    appBar:{
        borderRadius: 15,
        margin: '30px 0',
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(1,2),
        flexWrap: 'wrap',
        // [theme.breakpoints.down('xs')] :{
        //     justifyContent: 'center'
        // }
        
    },
    brandContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    // heading:{
    //     color: 'rgba(0,183,255, 1)',
    //     textDecoration: 'none',
    //     [theme.breakpoints.down('xs')]:{
    //         fontSize: 40,
    //     }
    // },
    image:{
        marginLeft: '15px',
        [theme.breakpoints.down('sm')] :{
            height: 50
        }

    },
    userDetails:{
        minWidth: 300,
        [theme.breakpoints.down('sm')]:{
            minWidth:'10px'
        }
    },
    userName:{
        [theme.breakpoints.down('sm')]:{
            display:'none'
        },
    },
    avatar:{
        [theme.breakpoints.down('xs')]:{
            display:'none'
        }
    },
    logOutButton:{
        [theme.breakpoints.down('xs')]:{
            display:'none'
        }
    },
    loggedInfo:{
        display:'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]:{
          justifyContent:'flex-end'
        }
    },
    logOutButtonSmall:{
        padding:'5px',
        display:'inline-block',
        [theme.breakpoints.up('sm')]:{
            display:'none'
        }
    },
    loggedOutInfo:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'end'
    },
    logInButton:{
        [theme.breakpoints.down('xs')]:{
            padding:theme.spacing(0)
        }
    }
    
}));