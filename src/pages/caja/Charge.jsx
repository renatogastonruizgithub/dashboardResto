import React from 'react'
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
import { useDispatch, useSelector } from "react-redux";
import { fetchCollections } from '../../store/tablesSlice';
import { useNavigate } from "react-router-dom";
import ChooseState from 'pages/component-overview/ChooseState';
import BtnCharge from 'pages/component-overview/BtnCharge';


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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  const { collections, loading, error } = useSelector((state) => state.tables);

  /* 
    const handleClick = (id) => {
  
      navigate(`/ticket/${id}`);
    }
   */

  console.log(collections)




  return (
    <div>
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
                    <BtnCharge idO={row.id} table={row.table}/>

                    <Typography marginLeft="1rem" marginRight="1rem" variant="subtitle2" noWrap>
                  {row.status}
                    </Typography>
                    <Typography marginLeft="1rem" marginRight="1rem" variant="h3" noWrap>
                    $ {row.total}
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                    {row.dateOrder}
                    </Typography>
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
