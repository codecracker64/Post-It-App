import { makeStyles, ThemeProvider } from "@material-ui/core";

export default makeStyles((theme)=>({
    root:{
        '& .MuiTextField-root':{	
        margin: theme.spacing(1),
        }
    },
    paper:{
        padding: theme.spacing(2),
    },
    form:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'  
    },  
    fileInput: {
        width: '96%',
        margin: '10px 0',
    },
    button:{
        width:'97%',
        marginTop: '6px',
        marginBottom: '6px'
    }
}))