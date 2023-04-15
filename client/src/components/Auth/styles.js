import { makeStyles } from "@material-ui/core";

export default makeStyles((theme)=>({
    paper:{
        display: 'flex',
        flexDirection: 'column',
        alignItems : 'center',
        justifyContent: 'center',
        padding: theme.spacing(2)
    },
    form:{
        marginTop: theme.spacing(2)
    },
    grid:{
        marginBottom: theme.spacing(2)
    },
    button:{
        marginBottom: theme.spacing(2)
    }
}))