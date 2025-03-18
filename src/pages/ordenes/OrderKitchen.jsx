import React from 'react'
import { useEffect  } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ToastContainer} from "react-toastify"; 
import Grid from '@mui/material/Grid';
import ChooseState from 'pages/component-overview/ChooseState';
import io from 'socket.io-client';
import { useSocket } from 'context/SocketContext';
import { Stack } from '@mui/material';
import useOrderStore from 'store/orderStore';



function OrderKitchen() {
   /*  const socket = useSocket();  */


    useEffect(() => {     
   fetchKitchen()
    
    }, [/* socket */]);

    const {kitchen, fetchKitchen, error } = useOrderStore();


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
                                    #{row.nroOrder}
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
                                <Stack direction="column" alignItems="center" justifyContent="center">
                                <Typography variant="h5" component="div">
                                   Cambiar de estado
                                </Typography>
                                <ChooseState statusGet={row.status.name} id={row.id}
                                 ></ChooseState>
                                </Stack>
                               
                            </CardActions>
                        </Card>
                    </Grid>
                ))}

            </Grid>
        </Container >
    )
}

export default OrderKitchen
