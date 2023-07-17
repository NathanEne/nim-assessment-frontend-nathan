import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import OrderConfirmation from "./OrderConfirmation";

function ConfirmationPage() {
  const [order, setOrder] = useState(undefined);
  const { id } = useParams();

  useEffect(() => {
    const getOrderByID = async () => {
      const response = await fetch(`/api/orders/${id}`);
      const data = await response.json();
      setOrder(data);
    };
    getOrderByID();
  }, [id]);

  if (!order)
    return (
      <div>
        <p>Error Confirming Order, Please try again at a later time</p>
      </div>
    );

  return <OrderConfirmation order={order} />;
}

export default ConfirmationPage;
