import React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import useTableStore from "../../store/tableStore";
import useOrderStore from "../../store/orderStore";


export default function BtnCharge({ idO, table ,site}) {
    
    const [collection, setCollection] = useState("pagado")
   

    const { id = null } = table || {};

    const { fetchCollections, error } = useTableStore();

    const {patchOrder } = useOrderStore();

    const datosActualizados = {
        table: id,
        collection: collection,
        site:site
    }
     
     const submitCharge = async () => {
      
          
        try {
            await patchOrder( idO, datosActualizados,"cobrado" )
            await fetchCollections()
         
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
