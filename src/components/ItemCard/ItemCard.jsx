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

  const removeProduct = async (productId) => {
    try {
      if (!cartData) {
        console.error('Cart data is not available.');
        return;
      }
  
      // Find the index of the product to be removed
      const productIndex = cartData.products.findIndex(
        (product) => product.id === productId
      );
  
      if (productIndex === -1) {
        console.error('Product not found in cart.');
        return;
      }
  
      const existingProduct = cartData.products[productIndex];
  
      let updatedProducts;
  
      // If quantity is greater than 1, decrement the quantity
      if (existingProduct.quantity > 1) {
        updatedProducts = [
          ...cartData.products.slice(0, productIndex),
          { ...existingProduct, quantity: existingProduct.quantity - 1 },
          ...cartData.products.slice(productIndex + 1),
        ];
      } else {
        // If quantity is 1, remove the product from the cart
        updatedProducts = [
          ...cartData.products.slice(0, productIndex),
          ...cartData.products.slice(productIndex + 1),
        ];
  
        // Update the cart with the updated products array
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
  
        // Update the cart data state with the response data
        setCartData(response.data);
        
        return; // Exit early after removing the product
      }
  
      // Update the cart with the updated products array
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
  
      // Update the cart data state with the response data
      setCartData(response.data);
    } catch (error) {
      console.error("Error removing product: ", error);
    }
  };

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
