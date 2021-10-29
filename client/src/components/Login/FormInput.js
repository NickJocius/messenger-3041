import React from 'react';
import {
    Grid,
    Box,
    Typography,
    FormControl,
    TextField,
    InputAdornment,
    
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    input: {
        width: '98%',
        marginTop: '2rem',
    },
    adornment: {
        '& p': {
          color: theme.palette.primary.main,
          fontSize: 12,
        }
        
    }
}));

const FormInput = ({ name, type, adorn }) => {
    const classes = useStyles();

    return (
        <Grid container item xs={12} justifyContent="center">
            <Box className={classes.input}>
                <FormControl margin="normal" required fullWidth>
                    <Typography>{name}</Typography>
                    <TextField
                        margin="normal"
                        aria-label={`${name.toLowerCase()}`}
                        size="medium"
                        name={`${name.toLowerCase()}`}
                        type={`${type.toLowerCase()}`}
                        InputProps={adorn ? {
                                endAdornment: <InputAdornment position="end" className={classes.adornment}>Forgot?</InputAdornment>
                            } : null}
                    />
                </FormControl>
            </Box>
        </Grid>
    );
};

export default FormInput;
