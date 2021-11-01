import React, { useState } from 'react';
import axios from 'axios';
import {
    Modal,
    Backdrop,
    Fade,
    Grid,
    Box,
    Typography,
    FilledInput,
    Button,
    FormControl, 
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const customAxios = axios.create();

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
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

const ImageUpload = ({setShowDialog, showDialog, setAttachments}) => {
    const classes = useStyles();
    const [images, setImages] = useState([]);

    const handleChange = (event) => {
        setImages(() => [...images,event.target.files[0]])
    }

    const handleUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        images.forEach(i => {
            formData.append("file", i);
            formData.append("upload_preset", "t4tlwpvz");
        });
        const res = await customAxios.post(`https://api.cloudinary.com/v1_1/capacity-free/image/upload`, formData);
        console.log(res.data)
        setAttachments(() => [res.data.url])
        setShowDialog(false);
        setImages([]);
    }

    const handleClose = () => {
        setShowDialog(false);
    }

    return (
        <Modal
            className={classes.root}
            open={showDialog}
            onClose={handleClose}
            BackdropComponent={Backdrop}
        >
            <Fade in={showDialog}>
            <Box className={classes.paper}>
                <Typography variant="h4">Upload Images</Typography>
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
                                    images.map((i, key) => (
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
            </Box>
            </Fade>
        </Modal>
        
    )
};

export default ImageUpload;
