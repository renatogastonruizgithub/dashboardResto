import React from 'react'
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { Box ,Typography} from '@mui/material';
import ChooseState from 'pages/component-overview/ChooseState';
import useOrderStore from 'store/orderStore';


export default function Ticket() {
  const { id } = useParams();

   // Asegurarse de que el estado tenga `oneOrder` y `loading`
   const { oneOrder, loading, error ,getOneOrder} = useOrderStore(); 

   useEffect(() => {
    if (id) {
  getOneOrder(id) 
    }
  }, [id]);

  // Manejo de estados de carga y error
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!oneOrder) return <p>No se encontró la orden</p>;


  return (
    <div>
    {loading ? <p>Cargando...</p> :

        <>
          <h2>Detalles de la Orden</h2>
          <p>Cliente: {oneOrder.name}</p>
          <p>Nro de pedido: {oneOrder.nroOrder}</p>
          <p>Total a pagar: ${oneOrder.total}</p>
          <p>Pago: {oneOrder.collection}</p>
        
          <p>Enviar a caja:</p>
          <ChooseState statusGet={oneOrder.status.name} id={oneOrder.id} chooseTo={["Cobrar"]}> </ChooseState>
          <h3>Productos en la Orden:</h3>
          <ul>
            {oneOrder.items.map((item, index) => (
              <li key={index}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={1}
                  pb={1}
                >
                  <Typography variant="body1">
                    <strong>Cantidad:</strong> {item.quantity} <strong>{item.product.name}</strong>
                  </Typography>
                  <Typography variant="body1" color="black" fontWeight="bold">
                    ${item.product.price}
                  </Typography>
                </Box>

              </li>
            ))}
          </ul>
        </>

      } 
    </div>
  )
}
