import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchTableOrder, } from "../../store/tablesSlice";
import { Grid, Card, CardContent, Typography, Stack,Button } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function NotAvailable() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
  
  
    useEffect(() => {
      dispatch(fetchTableOrder())
     
    }, [dispatch]);

    const handleClick = (id) => {  
        navigate(`/ticket/${id}`);   
         }
       
  const { tableOrder, loading, error } = useSelector((state) => state.tables);

  return (
    <>
      <Typography variant="h3">Mesas Ocupadas</Typography>
     <Grid container spacing={2} padding={2}>
        {tableOrder.map((table) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={table.id}>
            <Card
              elevation={2}
              sx={{
                backgroundColor: "#a5a5a5" ,
                color: "white",
                textAlign: "center",
                padding: 0,

              }}
            >
              <CardContent>
                <Typography variant="h3">{table.table.name}</Typography>

                <Stack spacing={2}>
                        <Button
                          sx={{ marginTop: "1rem" }}
                          variant="contained"
                          color="primary"
                          onClick={() => handleClick(table?.id)} 
                        >
                         Cobrar
                        </Button>  
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
 
    </>
  )
}
