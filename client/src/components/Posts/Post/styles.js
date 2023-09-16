import { makeStyles } from "@material-ui/core";

export default makeStyles(theme =>({
    root:{
        '& .MuiTypography-h5':{
            [theme.breakpoints.down('sm')]: {
              fontSize: '1.2rem',
            },
          },
    },

    Card:{
        display:'flex',
        flexDirection: 'column',
        borderRadius: '15px',
        position: 'relative',
        height: '100%',
        justifyContent: 'space-between',
    },
    media:{
        height:0,
        paddingTop: '56%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
    },
    overlay:{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white'
    },
    overlay2:{
        position: 'absolute',
        top: '20px',
        right: '20px',

    },
    details:{
        display:'flex',
        justifyContent: 'space-between',
        margin: '20px'
    },
    title:{
        padding: '0 16px'
    },
    cardActions:{
        position:'relative',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 16px 8px 16px' 
    },
    cardAction:{
        display:'block',
        textAlign:'initial',
    }
}))