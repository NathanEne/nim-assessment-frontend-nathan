import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import OrderConfirmation from "./OrderConfirmation";

function ConfirmationPage(props) {
  const [order, setOrder] = useState([]);
  const id = useParams();

  useEffect(() => {
    const getOrderByID = async () => {
      try {
        const response = await fetch("/api/orders/", id);
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        /* eslint-disable no-console */
        console.error(
          "ERROR performing GET request at /api/orders/",
          id,
          ": ",
          error
        );
        /* eslint-enable no-console */
      }
    };
    getOrderByID();
  }, [id]);

  return <OrderConfirmation order={order} />;
}

export default ConfirmationPage;
