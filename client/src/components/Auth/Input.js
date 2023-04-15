import { IconButton, InputAdornment, TextField, Grid } from "@material-ui/core"
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export default function Input({name, label, type, handleShowPassword, half, handleChange}){

    return(
        <Grid item xs={ half ? 6:12}>
            <TextField
            name={name}
            label={label}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            type={type}
            InputProps ={ name==="password" ? {
                endAdornment: <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                        { type==="password" ? <VisibilityOff /> : <Visibility /> }
                    </IconButton>
                </InputAdornment>
            }: null}
            />
        </Grid>
        
    )
}