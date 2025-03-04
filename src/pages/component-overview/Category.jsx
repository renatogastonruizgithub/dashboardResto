import React from 'react'
import { Grid, Card, CardContent, Typography, Stack, CardMedia, Container, CardActionArea } from '@mui/material'
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategori } from '../../store/productSlice';
import Modal from '@mui/material/Modal';
import { agregar, restar,  clearCart,  sendOrder } from '../../store/orderSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    bgcolor: 'background.paper',

    boxShadow: 24,
    p: 4,
};

function BasicModal({ open, handleClose, categoryID }) {
    const dispatch = useDispatch();

    useEffect(() => {
        /* if (categoryID) {  } */
            dispatch(fetchCategori(categoryID));
      
    }, [dispatch, categoryID]);

    const { categories, loading, error } = useSelector((state) => state.products);

    const { items } = useSelector((state) => state.orders);
    const category = categories && categories.products ? categories : null;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Container sx={style}>
                <Grid container spacing={2}>

                    {category?.products?.map((product, i) => (
                        <Grid key={i} item xs={12} sm={6} md={4} lg={3} >
                            <Card
                                key={product.id}
                                elevation={3}
                                sx={{
                                    /* backgroundColor: "#616161", */
                                    color: "black",
                                    textAlign: "center",
                                    padding: 0,
                                    cursor: "pointer",
                                    margin: 0
                                }}
                              
                            >      
                                    <CardContent>
                                        <Typography variant="h5"> {product.name}</Typography>

                                        <Stack
                                            spacing={2}
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="center"
                                            sx={{ marginTop: "1rem" }}
                                        >
                                           <button
                                                style={{ cursor: "pointer" }}
                                                onClick={() => dispatch(restar({ productId: product.id }))}
                                            >
                                                -
                                            </button>
                                            <Typography variant="h3">
                                                {items.find((item) => item.productId === product.id)?.quantity || 0}
                                            </Typography>
                                            <button
                                                style={{ cursor: "pointer" }}
                                                onClick={() => dispatch(agregar({ productId: product.id }))}>+</button> 
                                        </Stack>
                                    </CardContent>
                               
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Modal>
    );
}


export default function Category({ category }) {

    const [open, setOpen] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState(null);

    const handleOpen = (category) => {
        setSelectedCategory(category);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedCategory(null);
    };

    return (
        <Container>
            <Grid container spacing={2}>
                {category.map((category, i) => (
                    <Grid key={i} item xs={12} sm={6} md={4} lg={3} >
                        <Card
                            key={category.id}
                            elevation={3}
                            sx={{
                                /*  backgroundColor: "#616161", */
                                color: "black",
                                textAlign: "center",
                                padding: 0,
                                cursor: "pointer",
                                margin: 0
                            }}
                            onClick={() => handleOpen(category.id)}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    sx={{ objectFit: "contain" }}
                                    height="150"
                                    image={category.imagen}
                                    alt="Paella dish"
                                />

                                <CardContent>
                                    <Typography variant="p"> {category.name}</Typography>

                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <BasicModal open={open} handleClose={handleClose} categoryID={selectedCategory} /> 
        </Container>

    )
}


