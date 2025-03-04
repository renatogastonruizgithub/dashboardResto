import React from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getOneOrder } from '../../store/orderSlice';
import { Box ,Stack,Typography} from '@mui/material';
import ChooseState from 'pages/component-overview/ChooseState';


export default function Ticket() {
  const { id } = useParams();
  const dispatch = useDispatch();
   // Asegurarse de que el estado tenga `oneOrder` y `loading`
   const { oneOrder, loading, error } = useSelector((state) => state.orders); 

   useEffect(() => {
    if (id) {
      dispatch(getOneOrder(id)); 
    }
  }, [dispatch, id]);

  // Manejo de estados de carga y error
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!oneOrder) return <p>No se encontró la orden</p>;


console.log(oneOrder)


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
          <ChooseState status={oneOrder.status} id={oneOrder.id} chooseTo={["Cobrar"]}> </ChooseState>
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
