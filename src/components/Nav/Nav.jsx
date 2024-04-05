import React from "react";
import NavStyle from "./Nav.module.css";
import logo from "../../assets/shop_logo.jpg";
import cartLogo from "../../assets/cart.svg";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import CartModal from "../CartModal/CartModal";

const Nav = () => {
  const { totalQuantity } = useContext(CartContext);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <nav className={NavStyle.container}>
        <div className={NavStyle.brand}>
          <img className={NavStyle.logo} src={logo} alt="logo" />
          <h1 className={NavStyle.name}>Valoo</h1>
        </div>
        <div className={NavStyle.cartContainer}>
          <img
            className={NavStyle.cart}
            src={cartLogo}
            alt="cart"
            onClick={() => setModalOpen(true)}
          />
          <div className={NavStyle.quantityContainer}>{totalQuantity}</div>
        </div>
      </nav>
      {modalOpen && <CartModal setModalOpen={setModalOpen} />}
    </>
  );
};

export default Nav;
