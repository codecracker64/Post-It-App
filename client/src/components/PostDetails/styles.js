import {makeStyles, TextField} from '@material-ui/core';

export default makeStyles((theme)=>({
    root:{
        '& 	.MuiTypography-root':{
            margin:theme.spacing(1.5,0)
        },
        '& .MuiTypography-h4':{
            [theme.breakpoints.down('sm')]: {
              fontSize: '1.4rem',
            },
          },
    },
    // rootCard:{
    //     display:'flex',
    //     flexWrap:'wrap'
    // },
            
    media:{
        width:'100%',
        height:'100%',
        borderRadius:'20px',
        objectFit:'cover',
        maxHeight:'600px',
    },
    card:{
        display:'flex',
        width:'100%',
        justifyContent:'space-between',
        [theme.breakpoints.down('sm')]:{
            flexWrap: 'wrap',
            flexDirection:'column'
        }
    },
    infoSection:{
        margin:'10px',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        minWidth:'30%',
    },
    mediaSection:{
        marginLeft: '20px',
        minWidth: '40%',
        [theme.breakpoints.down('sm')]:{
            marginLeft:0
        }
    },
    loadingPostDetails:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px'
    },
    commentsSection:{
        display:'flex',
        justifyContent:'space-between',
        margin:'40px 0',
        [theme.breakpoints.down('sm')]:{
            flexDirection:'column'
        }
    },
    comments:{
        height:'200px',
        overflow:'auto',
        width:'40%',
        margin:'0 10px',
        [theme.breakpoints.down('sm')]:{
            width:'100%',
            marginBottom:'25px'
        }
    },
    commentInput:{
        width:'57%',
        margin:'0 10px',
        [theme.breakpoints.down('sm')]:{
            display:'flex',
            flexDirection:'column',
            width:'90%',
            alignItems:'flex-start'
        }
    },
    recommendedPostsSection:{
        marginTop:'30px',
        display:'flex',
        flexDirection:'column',
        flexWrap:'wrap',
        // maxWidth:'inherit'
    },
    recommendedPosts:{
        display:'flex',
        flexWrap:'wrap'
    },
    recommendedPostsCard:{
        margin:'20px',
        cursor:'pointer',
        maxWidth:'400px',
        outline: 'solid 1px',
        borderRadius: '15px',
        padding:'10px',
        [theme.breakpoints.down('sm')]:{
            margin:'10px'
        }
    }
}))