import React from 'react'
import Chip from '@mui/material/Chip';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { patchOrder, fetchOrder, fetchKitchen ,fetchCustomer,getOneOrder} from "../../store/orderSlice"

import {fetchCollections} from "../../store/tablesSlice"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  /* border: '2px solid #000', */
  boxShadow: 24,
  p: 4,
};
export default function ChooseState({ status, id, chooseTo }) {

  const [estado, setEstado] = React.useState('');
  const [open, setOpen] = React.useState(false)
  const [ID, setId] = React.useState("")

  const dispatch = useDispatch()



  const { loading, error } = useSelector((state) => state.orders);

  const handleOpen = (id) => {
    setOpen(true)
    setId(id)
  }
  const handleClose = () => setOpen(false)

  const handleChange = (event) => {
    setEstado(event.target.value)
  }

  const datosActualizados = {
    status: estado
  }

  const submitChoosed = async () => {

    try {
      await dispatch(patchOrder({ id, datosActualizados })).unwrap();
      dispatch(fetchOrder());
      dispatch(fetchKitchen());
      dispatch(fetchCustomer());
      dispatch(getOneOrder(id));


      setOpen(false)
    } catch (error) {
      console.error("Error actualizando el estado:", error);
    }
  }

  let color;
  let title;
  switch (status) {
    case "Cancelada":
      color = "error";
      title = "Cancelada";
      break;
    case "Para retirar":
      color = "success";
      title = "Para retirar";
      break;
    case "En proceso":
      color = "warning";
      title = "En proceso";
      break;
    case "Completada":
      color = "primary";
      title = "Completada";
      break;
    default:
      color = "default";
      title = "Pendiente";
  }
 
  return (
    < >
      <Chip clickable label={status} color={color} variant="outlined"
        onClick={() => handleOpen(id)}
      />


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cambiar el estado del pedido
          </Typography>
          <FormControl variant="filled" /* sx={{ m: 1, minWidth: 100 }} */>
            <InputLabel id="demo-simple-select-filled-label">estado
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={estado}
              onChange={handleChange}
            >
              {
                chooseTo.map((state,y) => {
                  return <MenuItem key={y} value={state}>{state}</MenuItem>
                  
                })
              }

            </Select>

            <Button variant="contained" onClick={() => submitChoosed()}>Aplicar cambios</Button>
          </FormControl>
        </Box>
      </Modal>


    </>
  )
}
