import { makeStyles } from '@material-ui/core';

export default makeStyles((theme)=>({

    appBar:{
        borderRadius: 15,
        margin: '30px 0',
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(1,2)
        
    },
    brandContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    heading:{
        color: 'rgba(0,183,255, 1)',
        textDecoration: 'none'
    },
    image:{
        marginLeft: '15px',
    },
    
}));