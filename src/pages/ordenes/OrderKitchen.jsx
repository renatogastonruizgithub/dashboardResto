import React from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from '../../store/orderSlice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import ChooseState from 'pages/component-overview/ChooseState';





function OrderKitchen() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrder());
    }, [dispatch]);

    const { orders, loading, error } = useSelector((state) => state.orders);
    console.log(orders)

    return (
        <Container >

            <Grid container spacing={4}>


                {orders.map((row) => (
                    
                    <Grid   key={row.id} item xs={12} sm={6} md={4} lg={4}>
                        <Card key={row.id}  sx={{ minWidth: 200 }}  elevation={3}>
                            <CardContent>
                                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                    En mesa
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {row.nroOrder}
                                </Typography>

                                <ul>
                                    {row.items.map((item, index) => (
                                        <li key={index}>
                                            {item.quantity} x {item.product.name} <strong>(preferencias)</strong> 
                                        </li>
                                    ))}
                                </ul>

                            </CardContent>
                            <CardActions>
                                <Typography variant="h5" component="div">
                                    Enviar a mesa
                                </Typography>
                                <ChooseState status={row.status} id={row.id}
                                 chooseTo={["En proceso","Para retirar"]}></ChooseState>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}

            </Grid>
        </Container >
    )
}

export default OrderKitchen
