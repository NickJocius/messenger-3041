import React, {useState} from 'react';
import {
    Container,
    Grid,
    Box,
    Typography,
    FilledInput,
    Button,
    FormControl, 
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        bottom: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        maxWidth: '100%',
        fontFamily: theme.typography.fontFamily
    },
    selectedFiles: {
        textAlign: 'center'
    },
    uploadBtnBox: {
        textAlign: 'center',
    },
    uploadBtn: {
        fontSize: theme.typography.fontSize,
        background: theme.palette.primary.main,
        color: theme.palette.neutral.main
    }
}));

const ImageUpload = ({setShowDialog}) => {
    const classes = useStyles();
    const [images, setImages] = useState([]);

    const handleChange = (event) => {
        setImages(() => [...images,event.target.files[0]])
    }

    const handleUpload = (event) => {
        event.preventDefault();
        
        console.log(images)
        setShowDialog(false)
    }

    return (
        <Container className={classes.root}>
            <Grid container  spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4">Upload Images</Typography>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleUpload}>
                        <Grid container item spacing={4}>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FilledInput
                                        type="file"
                                        name="file"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Box className={classes.selectedFiles}>
                                    {images && (
                                        images.map((i) => (
                                            <Typography key={i.name}>{i.name}</Typography>
                                        ))
                                    )}
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box className={classes.uploadBtnBox}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className={classes.uploadBtn}
                                    >
                                        Upload
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                
            </Grid>
        </Container>
        
    )
};

export default ImageUpload;
