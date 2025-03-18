import { Stack ,Typography} from '@mui/material';
import React, { useEffect } from 'react'
import useOrderStore from 'store/orderStore';

export default function ItemsCart({product}) {

    const { items, agregar,restar} = useOrderStore();
    const selectedProduct = product ||items;

     useEffect(() => {   
    
    
    }, [product, items]); 

    return (
        <div>
      {Array.isArray(selectedProduct) ? (
        // Renderizamos todos los items si selectedProduct es un array
        selectedProduct.map((item) => (
          <Stack
            key={item.productId}
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ marginTop: "1rem" }}
          >
            <Typography variant="h5">{item.name}</Typography>
            {item.quantity > 0 && ( // Mostrar el botón de restar solo si quantity > 0
              <button
              style={{ cursor: "pointer",fontSize:"1.2rem" ,backgroundColor:"hsl(6, 78%, 57%)"}}
                onClick={() => restar(item.productId)}
              >
                -
              </button>
            )}
            <Typography variant="h3">{item.quantity}</Typography>
            <button
           style={{ cursor: "pointer",fontSize:"1.2rem",backgroundColor:"#3498db" }}
              onClick={() => agregar(item.productId, item.name)}
            >
              +
            </button>
          </Stack>
        ))
      ) : (
        // Renderizamos el producto si selectedProduct no es un array
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ marginTop: "1rem" }}
        >
           {items.length > 0 && items.find((item) => item.productId === selectedProduct.id)?.quantity > 0 && (
            <button
              style={{ cursor: "pointer",fontSize:"1.2rem" ,backgroundColor:"hsl(6, 78%, 57%)"}}
              onClick={() => restar(selectedProduct.id)}
            >
              -
            </button>
          )}
          <Typography variant="h5">
            {items.length > 0
              ? items.find((item) => item.productId === selectedProduct.id)?.quantity || 0
              : 0}
          </Typography>

          <button
            style={{ cursor: "pointer",fontSize:"1.2rem",backgroundColor:"#3498db" }}
            onClick={() => agregar(selectedProduct.id, selectedProduct.name)}
          >
            +
          </button>
        </Stack>
      )}
    </div>
      );
}
