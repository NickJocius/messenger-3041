import React from 'react';
import {
    Grid,
    Box,
    Typography,
    FormControl,
    TextField,
    InputAdornment,
    FormHelperText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    input: {
        width: '98%',
        marginTop: '.5rem',
        fontSize: theme.typography.fontSize,
    },
    adornment: {
        '& p': {
          color: theme.palette.primary.main,
          fontSize: 12,
        }   
    },
    label: {
        fontSize: theme.typography.fontSize,
        color: theme.palette.secondary.main,
    }
}));

const ErrorInput = ({ title,name, type, adorn, req, formErrorMessage }) => {
    const classes = useStyles();

    return (
        <Grid container item xs={12} justifyContent="center">
            <Box className={classes.input}>
                <FormControl margin="normal" required fullWidth  {...(type === 'password' && {error:!!formErrorMessage.confirmPassword})}>
                    <Typography className={classes.label}>{title}</Typography>
                    <TextField
                        margin="dense"
                        aria-label={`${name.toLowerCase()}`}
                        size="small"
                        name={`${name}`}
                        type={`${type.toLowerCase()}`}
                        required={req}
                        {...(type === 'password' && {inputProps:{ minLength: 6 }})}
                        {...(adorn && {InputProps:{endAdornment: <InputAdornment position="end" className={classes.adornment}>Forgot?</InputAdornment>}})}
                    />
                    {type === 'password' && (
                        <FormHelperText>
                            {formErrorMessage.confirmPassword}
                        </FormHelperText>
                    )}
                </FormControl>
            </Box>
        </Grid>
    );
};

export default ErrorInput;