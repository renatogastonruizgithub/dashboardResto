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
import UsestatusStore from '../../store/statusStore';
import useOrderStore from 'store/orderStore';

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
export default function ChooseState({ statusGet, id, }) {
  const [estado, setEstado] = React.useState('');
  const [open, setOpen] = React.useState(false)
  const [ID, setId] = React.useState("")

  const{status,loading,error,fetchStatus,updateStatus}= UsestatusStore()

  const{fetchOrder,fetchKitchen,fetchCustomer,fetchWaiter,getOneOrder}=useOrderStore()



  useEffect(() => {
    
    fetchStatus();
  }, []);

  
  const statusArray = Array.isArray(status) ? status : [status];
  console.log(error)
  const handleOpen = (id) => {
    setOpen(true)
    setId(id)
  }
  const handleClose = () => setOpen(false)

  const handleChange = (event) => {
    setEstado(event.target.value)
   
  }


  const submitChoosed = async () => {
   

   try {
     
    await updateStatus( id, estado )
    await fetchOrder() 
    await fetchKitchen()      
    await fetchCustomer()
    await fetchWaiter()
    await getOneOrder(id)
      await fetchStatus();

      setOpen(false)
    } catch (error) {
      console.error("Error actualizando el estado:", error);
    }  
  }

  let color;
  let title;
  switch (statusGet) {
    case "cancelada":
      color = "error";
      title = "cancelada";
      break;
    case "para retirar":
      color = "success";
      title = "para retirar";
      break;
    case "en proceso":
      color = "warning";
      title = "en proceso";
      break;
    case "completada":
      color = "primary";
      title = "completada";
      break;
    default:
      color = "default";
      title = "pendiente";
  }
 
  return (
    < >
      <Chip clickable label={statusGet} color={color} variant="outlined"
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
                statusArray.map((state,y) => {
                  return <MenuItem key={y} value={state.id}>{state.name}</MenuItem>
                  
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
