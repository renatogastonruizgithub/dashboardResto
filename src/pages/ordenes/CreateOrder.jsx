import React from 'react'
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, fetchCategori } from '../../store/productSlice';
import { Grid, Card, CardContent, Typography, Stack, TextField, Container, Button } from '@mui/material'
import { setName, clearCart, sendOrder, agregar, restar } from '../../store/orderSlice';
import Category from 'pages/component-overview/Category';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

function CreateOrder() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [customerName, setCustomerName] = useState(" ")
  const [carry, setCarry] = useState("En mesa")
  const [value, setValue] = React.useState('1');


  useEffect(() => {
    dispatch(clearCart());
    dispatch(fetchProduct());
    

    if (!id) {
      setCarry("Para llevar")
    }

  }, [dispatch]);

  const { products, categories, loading, error } = useSelector((state) => state.products);

  const { items } = useSelector((state) => state.orders);


  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleOrder = () => {
    if (!customerName) {
      alert("Debes ingresar tu nombre");
      return;
    }


    const orderData = {
      ...(id && { table: Number(id) }),

      ...(carry && { site: carry }),
      name: customerName,
      productIds: items,
    }

    dispatch(sendOrder(orderData))
    dispatch(clearCart())
    setCustomerName(" ")
  }

  return (
    <Container>
      {id ? <Typography variant="h5" sx={{ marginBottom: "2rem" }}> Vas a oucpar a la Mesa {id}</Typography> : " "}
      <TabContext value={value} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Dato cliente" value="1" />
            <Tab label="Elejir comidas" value="2" />
            <Tab label="Confirmar" value="3" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <Stack direction="row" spacing={3} margin={4}>
            <TextField
              label="Nombre del cliente"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              margin="normal"
            />

          </Stack>
        </TabPanel>

        <TabPanel value="2">  <Category category={products}></Category></TabPanel>

        <TabPanel value="3">
          <ul>
            <h3>{customerName}</h3>

            {items.length > 0 ? (
              <>
                {items.map((item) => (
                  <li key={item.productId}>
                    <Stack direction="row">
                      <p>{item.name}</p>
                      <p style={{ marginLeft: "1rem" }}>{item.quantity}</p>
                    </Stack>

                    <button
                      style={{ marginLeft: "1rem" }}
                      onClick={() => dispatch(agregar({ productId: item.productId, name: item.name }))}
                    >
                      +
                    </button>

                    <button
                      style={{ marginLeft: "1rem" }}
                      onClick={() => dispatch(restar({ productId: item.productId }))}
                    >
                      -
                    </button>
                  </li>
                ))}

                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginTop: "1rem" }}
                  onClick={handleOrder}
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar a cocina"}
                </Button>
              </>
            ) : (
              <p>No hay productos en la orden.</p>
            )}
          </ul>
        </TabPanel>
      </TabContext>


    </Container>
  )
}

export default CreateOrder
