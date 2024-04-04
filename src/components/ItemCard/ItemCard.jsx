import React from "react";
import CardStyle from "./ItemCard.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const ItemCard = ({ products }) => {
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/carts/1`);
        setCartData(response.data);
      } catch (error) {
        console.error("Error fetching cart: ", error);
      }
    };
    getCart();
  }, []);

  useEffect(() => {
    console.log(cartData);
  }, [cartData]);

  const addProduct = async (productId) => {
    try {
      if (!cartData) {
        console.error("Cart data not available");
        return;
      }
      const existingProduct = cartData.products.find(
        (product) => product.id === productId
      );

      let updatedProducts;
      if (existingProduct) {
        updatedProducts = [
          ...cartData.products.map((product) =>
            product.id === productId
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        ];
      } else {
        updatedProducts = [
          ...cartData.products,
          {
            id: productId,
            quantity: 1,
          },
        ];
      }

      const response = await axios.put(
        `https://dummyjson.com/carts/1`,
        {
          merge: true,
          products: updatedProducts,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setCartData(response.data);
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const removeProduct = async (productId) => {};

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
