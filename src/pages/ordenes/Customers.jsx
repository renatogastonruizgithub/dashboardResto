import React from 'react'
import { useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import useOrderStore from 'store/orderStore';


export default function Customers() {
  useEffect(() => {
    fetchCustomer()

  }, []);

  const { customer, fetchCustomer, error } = useOrderStore();
 
  const ordersInProcess = customer.filter(order => order.status.name === "en proceso"|| order.status.name==="en proceso para llevar");
  const ordersInTable = customer.filter(order => order.site === "En mesa" && order.status.name==="llevar a mesa" )

  const ordersTakeOut  = customer.filter(order => order.site === "Para llevar"&& order.status.name==="completada para llevar" );


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
