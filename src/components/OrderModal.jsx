import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [phoneValid, setPhoneValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [addressValid, setAddressValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validateName = () => {
      // I could not find the shortest address ever recorded online
      // hopefully making sure it is not empty will do
      if (name.length > 0) {
        return setNameValid(true);
      }
      return setNameValid(false);
    };
    validateName();
  }, [name]);

  useEffect(() => {
    const validatePhone = () => {
      if (phone.match(/^\(\d{3}\)\d{3}-\d{4}$/)) {
        return setPhoneValid(true);
      }
      return setPhoneValid(false);
    };
    validatePhone();
  }, [phone]);

  useEffect(() => {
    const validateAddress = () => {
      // after research online I found that filtering with regex is extremely hard
      // because of languages using different characters
      // probably better to just check its not empty
      // Also some people might want to go by aliases that could be very short
      if (address.length > 0) {
        return setAddressValid(true);
      }
      return setAddressValid(false);
    };
    validateAddress();
  }, [address]);

  const placeOrder = async () => {
    if (!phoneValid || !nameValid || !addressValid) {
      return;
    }
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phone,
        address,
        items: order
      })
    });

    const data = await response.json();
    if (response.status === 200) {
      navigate(`/order-confirmation/${data.id}`);
    }
  };

  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onKeyPress={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                type="text"
                id="name"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setPhone(e.target.value);
                }}
                type="phone"
                id="phone"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                type="phone"
                id="address"
              />
            </label>
          </div>
        </form>
        {addressValid ? null : (
          <p className={styles.error}>* Please fill the address field</p>
        )}
        {phoneValid ? null : (
          <p className={styles.error}>
            * Please enter phone numbers in the following format: (###)###-####
          </p>
        )}
        {nameValid ? null : (
          <p className={styles.error}>* Please fill the name field</p>
        )}
        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>
          <button
            onClick={() => {
              placeOrder();
            }}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
