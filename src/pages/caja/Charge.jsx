import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import { useEffect } from "react";
import BtnCharge from 'pages/component-overview/BtnCharge';
import useTableStore from "../../store/tableStore";
import { ToastContainer } from 'react-toastify';
import { useSocket } from 'context/SocketContext';
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};
export default function Charge() {
  const { setIgnoreNotifications } = useSocket();

  useEffect(() => {   
     fetchCollections()
     setIgnoreNotifications(true);
     return () => {
      // Restaurar notificaciones cuando el componente se desmonte
      setIgnoreNotifications(false);
    };
  }, []);

  const {collections, fetchCollections, loading, tableOrder } = useTableStore();

  return ( 
    <div>
        <ToastContainer></ToastContainer>
      <List
        component="nav"
        sx={{
          px: 0,
          py: 0,
          '& .MuiListItemButton-root': {
            py: 1.5,
            '& .MuiAvatar-root': avatarSX,
            '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
          }
        }}
      >
      
        {
          collections.map((row) => {
            return (
              <ListItemButton divider key={row.id}>
                <ListItemAvatar>
                  <Avatar sx={{ color: 'success.main', bgcolor: 'success.lighter' }}>
                    <GiftOutlined />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={<Typography variant="subtitle1">{row.nroOrder}</Typography>}
                  secondary={<Typography variant="subtitle2">{row.site}</Typography>}

                />

                <ListItemSecondaryAction>
                  <Stack alignItems="center" justifyContent="space-between" direction="row">                  

                    <Typography marginLeft="1rem" marginRight="1rem" variant="h3" noWrap>
                      $ {row.total}
                    </Typography>
                    <Typography marginRight="1rem" variant="h6" color="secondary" noWrap>
                      {row.dateOrder}
                    </Typography>
                    <BtnCharge idO={row.id} table={row.table} site={row.site}/>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItemButton>
            )

          })
        }



      </List>
    </div>
  )
}
