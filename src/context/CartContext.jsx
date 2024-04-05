import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // find values of current cart
  useEffect(() => {
    let quantity = 0;
    let value = 0;
    cart.forEach(item => {
      quantity += item.quantity;
      value += item.quantity * item.price;
    })
    setTotalQuantity(quantity)
    setTotalValue(value)
  }, [cart])

  const addProduct = (productId, price, title, image) => {
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { id: productId, quantity: 1, price: price, title: title, image: image }]);
    }
  };


  const removeProduct = (productId) => {
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex === -1) {
      console.error("Not in your cart!")
    }
    else if (cart[existingProductIndex].quantity > 1) {
      const updatedCart = [...cart]
      updatedCart[existingProductIndex].quantity -= 1;
      setCart(updatedCart)
    }
    else {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addProduct, removeProduct, totalQuantity, totalValue }}>
      {children}
    </CartContext.Provider>
  );
};