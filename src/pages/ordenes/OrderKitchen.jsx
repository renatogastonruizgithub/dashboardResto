import React from 'react'
import { useEffect,useRef  } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchKitchen } from '../../store/orderSlice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ToastContainer} from "react-toastify"; 
import Grid from '@mui/material/Grid';
import ChooseState from 'pages/component-overview/ChooseState';

import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // URL del backend NestJS

import { useSocket } from 'context/SocketContext';



function OrderKitchen() {
    const socket = useSocket(); 
     const dispatch = useDispatch()

    useEffect(() => {
     
      dispatch(fetchKitchen());

    
    }, [socket]);

    const {kitchen, loading, error } = useSelector((state) => state.orders);
    console.log(kitchen)

    return (
        <Container >
               <ToastContainer />
            <Grid container spacing={4}>


                {kitchen.map((row) => (
                    
                    <Grid   key={row.id} item xs={12} sm={6} md={4} lg={3}>
                        <Card key={row.id}  sx={{ minWidth: 200 }}  elevation={3}>
                            <CardContent>
                                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                    {row.site}
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
