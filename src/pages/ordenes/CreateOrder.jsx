import React from 'react'
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, } from '../../store/productSlice';
import { Grid, Card, CardContent, Typography, Stack, TextField, Container, Button } from '@mui/material'
import { agregar, restar,  clearCart,  sendOrder } from '../../store/orderSlice';


function CreateOrder() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [customerName, setCustomerName] = useState("")  
  const [carry, setCarry] = useState("En mesa")

  useEffect(() => {
    dispatch(clearCart());
    dispatch(fetchProduct());
    /* dispatch(setTable(id)); */

    if(!id){
      setCarry("Para llevar")
    }

  }, [dispatch]);

  const { products, loading, error } = useSelector((state) => state.products);

  const { items } = useSelector((state) => state.orders);




  const handleOrder = () => {
    if (!customerName) {
      alert("Debes ingresar tu nombre");
      return;
    }
   

      const orderData = {
        ...(id && { table: Number(id)}),
        
        ...(carry && { site: carry }),
        name: customerName,
        productIds: items,
      }
      console.log(orderData)
     dispatch(sendOrder(orderData))  
    }

    return (
      <Container>
        {id?<Typography variant="h5"> Mesa {id}</Typography>:" " }
        
        <Stack direction="row" spacing={3} margin={4}>
          <TextField
            label="Nombre del cliente"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="success"

            sx={{ marginTop: "1rem" }}
            onClick={handleOrder}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar Pedido"}
          </Button>
        </Stack>



        <Grid container spacing={2}>

          {products.map((product, i) => (
            <Grid key={i} item xs={12} sm={6} md={4} lg={3} >
              <Card
                key={product.id}
                elevation={2}
                sx={{
                  backgroundColor: "#616161",
                  color: "white",
                  textAlign: "center",
                  padding: 0,

                  margin: 0
                }}
              >
                <CardContent>
                  <Typography variant="p"> {product.name}</Typography>

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
    )
  }

  export default CreateOrder
