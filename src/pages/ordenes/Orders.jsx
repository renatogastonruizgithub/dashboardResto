
import React from 'react'
import { useEffect } from "react";
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from "react-router-dom";
import useOrderStore from 'store/orderStore';

export default function Orders() {

  const navigate = useNavigate();
  useEffect(() => {
   fetchOrder()
  }, []);

  const { orders, fetchOrder, error } = useOrderStore();


  const handleClick = (id) => {

    navigate(`/ticket/${id}`);
  }
  
  return (
    <>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}

      >
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>

            <TableRow>
              <TableCell>Nro orden</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell >Nombre</TableCell>
              <TableCell >Pago</TableCell>
              <TableCell >Total a pagar</TableCell>
              <TableCell >Tipo</TableCell>
              <TableCell >Detalle</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.nroOrder}
                </TableCell >
                <TableCell component="th" scope="row">
                  {row.dateOrder}
                </TableCell >
                <TableCell component="th" scope="row" >                 
                {row.status.name}
                </TableCell>

                <TableCell component="th" scope="row" >{row.name}</TableCell>
                <TableCell component="th" scope="row" >{row.collection}</TableCell>
                <TableCell component="th" scope="row" >ARS ${row.total}</TableCell>
                <TableCell component="th" scope="row" >{row.site}</TableCell>
                <TableCell component="th" scope="row" >
                
                   <Chip
                    onClick={() => handleClick(row.id)}
                    clickable label={"detalle"}                    
                    
                    color="default" variant="outlined" /> 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </>
  )
}
