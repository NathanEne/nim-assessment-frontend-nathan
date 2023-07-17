import React from "react";
import styles from "./styles/OrderConfirmation.module.css";

function OrderConfirmation({ order }) {
  const { name, address, id, items } = order;

  let i = 0;
  let totalPrice = 0;
  const itemsNew = [];
  while (i < items.length) {
    itemsNew[i] = `${items[i].item.name}, ${items[i].quantity}`;
    totalPrice += items[i].item.price * items[i].quantity;
    i += 1;
  }

  return (
    <div className={styles.container}>
      <h1>Order Confirmation</h1>
      <p>Order Id: {id.toString()}</p>
      <ul>
        <li> Name: {name}</li>
        <li>Address: {address}</li>
        <li>
          Items:
          <ul className={styles["items-list"]}>
            <li>
              {itemsNew.map((elem) => (
                <p key="$elem">{elem}</p>
              ))}
            </li>
          </ul>
        </li>
        <li className={styles["sub-total"]}>Sub Total: ${totalPrice}</li>
      </ul>
    </div>
  );
}

export default OrderConfirmation;
