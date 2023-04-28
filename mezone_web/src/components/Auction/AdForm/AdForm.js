// max character for prod name 15 chars
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Fragment } from 'react';
// MUI
import {
    Box,
    Paper,
    TextField,
    Button,
    InputLabel,
    Typography,
    Input,
} from '@mui/material';
// Files
import Alert from '../Alert/Alert';
import {
    boxStyle,
    adFormArea,
    formComponent,
    formTextField,
    formSubmitButtonContainer,
} from '../AuctionPost/adStyles';
import LoadingDisplay from '../LoadingDisplay/LoadingDisplay';
// Actions
import { postAd } from '../../../actions/Ad';
import { setAlert, clearAlerts } from '../../../actions/Alert';
import { cloudinaryUpload } from '../../../actions/Admin';
import './AdForm.css';

const AdForm = (props) => {
    const [form, setForm] = useState({
        productName: '',
        description: '',
        basePrice: 0,
        duration: 300,
        category: "Mobiles",
        image: '',
    });
    const [uploading, setUploading] = useState(false);
    const [category, setCategory] = useState("Mobiles");
    const [imageUrl, setImageUrl] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        return () => {
            props.clearAlerts();
        };
    }, []);

    const dispatch = useDispatch();

    const handleFormChange = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append('file', e.target.files[0], 'file');
        cloudinaryUpload(uploadData)
            .then((response) => {
                setImageUrl(response.secure_url);
                setForm((prevState) => ({
                    ...prevState,
                    image: response.secure_url,
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setForm((prevState) => ({
            ...prevState,
            images: imageUrl,
            category: category,
        }));
        dispatch(postAd({
            ...form,
            category: category,
        }));
        setImageUrl(null);
        setCategory("Mobiles");
        setForm({
            productName: '',
            description: '',
            basePrice: 0,
            duration: 0,
            category: category,
            image: '',
        });
    };

    useEffect(() => {
        if (formSubmitted) {
            setForm({
                productName: '',
                description: '',
                basePrice: 0,
                duration: 300,
                category: "Mobiles",
                image: '',
            });
            setFormSubmitted(false);
        }
    }, [formSubmitted]);

    return (
        <Fragment>
            <Box sx={boxStyle}>
                <Paper sx={adFormArea}>
                    {/* Page title */}
                    <Typography variant='h4'>Post Auction </Typography>
                    <Alert />

                    {/* Form */}
                    <Box sx={formComponent}>
                        <InputLabel>Product Name*</InputLabel>
                        <TextField
                            name='productName'
                            onChange={(e) => {
                                handleFormChange(e);
                            }}
                            size='small'
                            sx={formTextField}
                        ></TextField>
                    </Box>

                    <Box sx={formComponent}>
                        <InputLabel>Description</InputLabel>
                        <TextField
                            name='description'
                            multiline
                            placeholder='Product description'
                            onChange={(e) => handleFormChange(e)}
                            size='small'
                            rows={3}
                            sx={formTextField}
                        />
                    </Box>
                    <Box sx={formComponent}>
                        <InputLabel>Base Price*</InputLabel>
                        <TextField
                            name='basePrice'
                            onChange={(e) => {
                                handleFormChange(e);
                            }}
                            size='small'
                            placeholder='Auction will start from this price point.'
                            sx={formTextField}
                            InputProps={{
                                inputProps: {
                                    type: 'number',
                                    pattern: '[0-9]*',
                                    inputMode: 'numeric',
                                    title: 'Please enter valid value',
                                    min: '0'
                                },
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        ></TextField>
                    </Box>


                    <Box sx={formComponent}>
                        <InputLabel>Duration</InputLabel>
                        <TextField
                            name='duration'
                            onChange={(e) => {
                                handleFormChange(e);
                            }}
                            size='small'
                            placeholder='Duration in seconds (Max 1 hour as 3600 seconds)'
                            sx={formTextField}
                            InputProps={{
                                inputProps: {
                                    type: 'number',
                                    pattern: '[0-9]*',
                                    inputMode: 'numeric',
                                    title: 'Please enter valid value',
                                    min: '0',
                                    max: '3600',
                                },
                                startAdornment: <InputAdornment position="start">S</InputAdornment>,
                            }}
                            
                        ></TextField>
                    </Box>

                    <Box sx={formComponent}>
                        <InputLabel>Category</InputLabel>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="Mobiles">Mobiles</option>
                            <option value="Laptops">Essentials</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Appliances">Appliances</option>
                            <option value="Books">Books</option>
                            <option value="Fashion">Fashion</option>
                        </select>
                    </Box>
                    {uploading ? (
                        <LoadingDisplay />
                    ) : (
                        <Box sx={formComponent}>
                            <InputLabel>Upload image</InputLabel>
                            <label HTMLfor="images">Images:</label>
                            <input
                                type="file"
                                id="images"
                                onChange={(e) => handleFileUpload(e)}
                            />
                            {imageUrl && (
                                <img className="preview-image" src={imageUrl} alt="preview" />
                            )}

                        </Box>
                    )}

                    <Box sx={formSubmitButtonContainer}>
                        {!uploading && (
                            <Button variant='contained' onClick={(e) => handleSubmit(e)}>
                                Submit
                            </Button>
                        )}
                    </Box>
                </Paper>
            </Box>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { postAd, setAlert, clearAlerts })(AdForm);
