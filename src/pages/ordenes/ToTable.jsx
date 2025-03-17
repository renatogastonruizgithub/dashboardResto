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
import ChooseState from 'pages/component-overview/ChooseState';
import useOrderStore from 'store/orderStore';

export default function ToTable() {

  useEffect(() => {
    fetchWaiter()
  }, []);

  const { waiter, fetchWaiter, error } = useOrderStore();

  const renderOrders = () => (
    <List>
      {waiter.map((row) => (
        <ListItem key={row.id} disablePadding>
          <ListItemButton>
            {row.nroOrder} -

            <strong> {row.table && row.table.name ? row.table.name : "Sin mesa"}</strong>
            -
            {row.name}

          </ListItemButton>
          <ChooseState statusGet={row.status.name} id={row.id}></ChooseState>
        </ListItem>
      ))}
    </List>
  )

  return (
    <div>
      <Container>
        <Grid container spacing={2}>

          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card sx={{ minWidth: 200 }} elevation={3}>
              <CardContent>
                <Typography variant="h1" component="div">
                  Para llevar a mesa
                </Typography>
                {renderOrders()}

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container >
    </div>
  )
}
