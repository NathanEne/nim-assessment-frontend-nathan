import React, { useEffect, useState } from "react";
import styles from "./styles/Order.module.css";
import ConfirmationPage from "./ConfirmationPage";

function OrderConfirmation(props){
    const name = props.order.name;
    const address = props.order.address;      
    const id = props.order.id;
      
    const items = [];
    let i = 0;
    while (i < props.order.items.length) {
        items[i] = props.order.items[0].item.name + ", " +props.order.items[0].quantity
        console.log(items[i])
        i++;
    }
        


    
    return (
        <>
            <h1>Order Confirmation</h1>
            <ul>
                <li>Name: {name}</li>
                <li>Address: {address}</li>
                <li>Items: {items}</li>
                <li>Id: {id}</li>
            </ul>
        </>

    );
}

export default OrderConfirmation;