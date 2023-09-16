import { makeStyles } from "@material-ui/core";

export default makeStyles((theme)=>({
    root:{
        '& .MuiTextField-root':{	
            margin: theme.spacing(1,0),
        },
        '& .MuiTypography-root':{
            display: 'flex',
            justifyContent: 'center'
        }
    },
    paper:{
        padding: theme.spacing(2),
        margin: '12px 0',
    },
    form:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'  
    },  
    fileInput: {
        width: '100%',
        margin: '12px 0',
    },
    button:{
        width:'100%',
        margin: '6px 0'
    }
}))