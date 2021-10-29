import React from 'react';
import {
    Grid,
    Box,
    Typography,
    Button, 
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formBox: {
        maxWidth: '100%',
        width: 380,
        height: 'fit-content'
    },
    buttonBox: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2rem',
        paddingBottom: '1rem'
      },
      button2: {
        background: theme.palette.primary.main,
        color: '#fff',
        width: 160,
        maxWidth: '100%',
        height: 56,
      },
}));

const UserForm = ({ heading,userAction,handler, children }) => {
    const classes = useStyles();

    return (
        <Grid container  xs={12} justifyContent="center">
            <Box className={classes.formBox}>
                <Typography variant='h5'>{heading}</Typography>
                <form onSubmit={handler}>
                    <Grid>
                        {children}
                        <Grid>
                            <Box className={classes.buttonBox}>
                                <Button type="submit" variant="contained" size="large" className={classes.button2}>
                                    {userAction}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
              </form>
            </Box>
        </Grid>
    );
};

export default UserForm;
