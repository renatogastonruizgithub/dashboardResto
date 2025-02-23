import React from 'react'
import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from '../../store/productSlice';

function CreateOrder() {
 const { id } = useParams();

 const dispatch = useDispatch();

 useEffect(() => {
     dispatch(fetchProduct());
 }, [dispatch]);

 const { products, loading, error } = useSelector((state) => state.products);
 



  return (
    <div>
    { id }

    {
      products.map((product,p)=>{
        return(
       
          <li key={product.id}>
              {product.name}
          </li>
      
        )
      })
    }

    </div>
  )
}

export default CreateOrder
