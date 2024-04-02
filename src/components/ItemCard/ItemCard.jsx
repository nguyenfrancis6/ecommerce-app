import React from "react";
import CardStyle from "./ItemCard.module.css";

const ItemCard = ({ products }) => {
  return (
    <>
      {products.map((item, index) => (
        <div className={CardStyle.card} key={index}>
          <img className={CardStyle.image} src={item.images[0]} alt="" />
          <div className={CardStyle.description}>
            <p>{item.title}</p>
            <p>Rating: {item.rating}</p>
            <p>${item.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ItemCard;
