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
    <div>
      <h1>Order Confirmation</h1>

      <ul>
        <li> Name: {name}</li>
        <li>Address: {address}</li>
        <li>Items: {itemsNew}</li>
        <li>Order Id: {id}</li>
        <li>Sub Total: {totalPrice}</li>
      </ul>
    </div>
  );
}

export default OrderConfirmation;
