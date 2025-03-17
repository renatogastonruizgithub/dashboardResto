import { Grid, Card, CardContent, Typography, Stack } from '@mui/material'
import React from 'react'
import { useEffect } from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import useTableStore from "../../store/tableStore";

export default function Tablets() {
 
  const navigate = useNavigate();
 
  const { tables, fetchTables, loading, error } = useTableStore();
  useEffect(() => {
    fetchTables()
   
  }, []);

 
  const handleOrder = (id) => {  
    navigate(`/createOrder/${id}`);   
     }


 

  return (
    <>
      <Typography variant="h3">Mesas disponibles</Typography>
     <Grid container spacing={2} padding={2}>
        {tables.map((table) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={table.id}>
            <Card
              elevation={2}
              sx={{
                backgroundColor:"#8cc78f" ,
                color: "white",
                textAlign: "center",
                padding: 0,

              }}
            >
              <CardContent>
                <Typography variant="h3">{table.name}</Typography>

                <Stack spacing={2}>
                
                      <Typography variant="p">Disponible</Typography>                    
                     
                        <Button
                         
                        
                          sx={{ marginTop: "1rem" }}
                          variant="contained"
                          color="primary"
                          onClick={() => handleOrder(table?.id)} 
                        >
                          Crear pedido
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
