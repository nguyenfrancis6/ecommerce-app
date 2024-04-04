import React, { useContext } from "react";
import CardStyle from "./ItemCard.module.css";
import { useEffect } from "react";
import { CartContext } from "../../context/CartContext";

const ItemCard = ({ products }) => {
  const { cart, addProduct, removeProduct } = useContext(CartContext);

  useEffect(() => {
    console.log(cart)
  }, [cart])

  return (
    <>
      {products.map((item, index) => (
        <div className={CardStyle.card} key={item.id}>
          <img className={CardStyle.image} src={item.images[0]} alt="" />
          <div className={CardStyle.description}>
            <p>{item.title}</p>
            <p>Rating: {item.rating}</p>
            <p>${item.price.toFixed(2)}</p>
            <div className={CardStyle.buttons}>
              <button
                className={CardStyle.editButton}
                onClick={() => removeProduct(item.id)}
              >
                -
              </button>
              <button
                className={CardStyle.editButton}
                onClick={() => addProduct(item.id)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ItemCard;
