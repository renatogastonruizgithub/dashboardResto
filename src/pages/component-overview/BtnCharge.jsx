import React from 'react'
import { useState, useEffect } from 'react'
import { patchOrder } from "../../store/orderSlice"
import { Button } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { fetchCollections } from 'store/tablesSlice';






export default function BtnCharge({ idO, table }) {
  const dispatch = useDispatch()
    const [collection, setCollection] = useState("Completado")
   

    const { id = null } = table || {};



    const datosActualizados = {
        table: id,
        collection: collection
    }
     
     const submitCharge = async () => {
    
          
        try {
            await  dispatch(patchOrder({ id: idO, datosActualizados })).unwrap();
            dispatch(fetchCollections())
        } catch (error) {
            console.error("Error actualizando el estado:", error);
        } 
    } 

    return (
        <>
            <Button variant="contained" onClick={()=>submitCharge()}>Cobrar</Button>

        </>
    )
}
