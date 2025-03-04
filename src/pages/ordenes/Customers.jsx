import React from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomer } from '../../store/orderSlice';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


export default function Customers() {


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomer());

  }, [dispatch]);

  const { customer, loading, error } = useSelector((state) => state.orders);
 
  const ordersInProcess = customer.filter(order => order.status === "En proceso");
  const ordersInTable = customer.filter(order => order.site === "En mesa" && order.status==="Para retirar" )

  const ordersTakeOut  = customer.filter(order => order.site === "Para llevar"&& order.status==="Para retirar" );


  const renderOrders = (orders) => (
    <List>
      {orders.map((row) => (
        <ListItem key={row.id} disablePadding>
          <ListItemButton>
            {row.nroOrder} - {row.name}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )

  return (
    <div>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <Card sx={{ minWidth: 200 }} elevation={3}>
              <CardContent>
                <Typography variant="h1" component="div">
                  En proceso
                </Typography>
                    {renderOrders(ordersInProcess)}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <Card sx={{ minWidth: 200 }} elevation={3}>
              <CardContent>
                <Typography variant="h1" component="div">
                  Entrega en mesa
                </Typography>
                {renderOrders(ordersInTable)}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <Card sx={{ minWidth: 200 }} elevation={3}>
              <CardContent>
                <Typography variant="h1" component="div">
                  Para llevar
                </Typography>
                {renderOrders(ordersTakeOut)}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container >
    </div>
  )
}
