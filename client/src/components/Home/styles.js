import { makeStyles } from "@material-ui/core";

export default makeStyles((theme)=> ({
    appBarSearch:{
        display:'flex',
        padding: theme.spacing(2),
        '& .MuiButton-root':{
            margin:'12px 0'
        }
        // padding: '16px'
    },
    paper:{
        padding: theme.spacing(2),
        display:'flex',
        justifyContent: 'center'
    },
    paginate:{
        display:'flex',
        justifyContent:'center'
    }
}) )