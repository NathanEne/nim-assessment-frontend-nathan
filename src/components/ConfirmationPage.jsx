import React, { useEffect, useState } from "react";
import { useParams } from "react-router";


 
  function ConfirmationPage(props) {
    const [order, setOrder] = useState([]);
    const id = useParams();
    
    const getOrderByID = async () => {
        const response = await fetch("/api/orders/",id);
        const data = await response.json();
        setOrder(data);
      };
    
    useEffect(() => {
        getOrderByID();
      }, []);

    return (
        <>
        <OrderConfirmation order = {order}/>
        </>
    );
  }
