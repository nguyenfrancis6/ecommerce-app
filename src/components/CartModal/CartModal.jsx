import React from "react";
import ModalStyle from "./CartModal.module.css";
import exit from "../../assets/exit.png";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import CardStyle from '../ItemCard/ItemCard.module.css'

const CartModal = ({ setModalOpen }) => {
  const { cart, totalQuantity, totalValue, addProduct, removeProduct } = useContext(CartContext);

  return (
    <div className={ModalStyle.modalContainer}>
      <button className={ModalStyle.exit} onClick={() => setModalOpen(false)}>
        <img className={ModalStyle.exitIcon} src={exit} alt="" />
      </button>
      <h1>Your Cart</h1>
      <div className={ModalStyle.productLabels}>
        <p>Products</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
      </div>
      <div className={ModalStyle.productContainer}>
        {cart.map((item, index) => (
          <div className={ModalStyle.productDetails} key={item.id}>
            <div className={ModalStyle.product}>
              <img src={item.image} alt="" />
              <p>{item.title}</p>
            </div>
            <p>{item.price.toFixed(2)}</p>
            <div className={ModalStyle.quantityContainer}>
              <button className={CardStyle.editButton} onClick={() => removeProduct(item.id)}>-</button>
              <p>{item.quantity}</p>
              <button className={CardStyle.editButton} onClick={() => addProduct(item.id, item.price, item.title, item.image)}>+</button>
            </div>
            <p>{(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div>Total: ${totalValue.toFixed(2)}</div>
    </div>
  );
};

export default CartModal;
