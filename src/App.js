import "./App.css";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Products from "./components/Products/Products";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <>
      <CartProvider>
        <Nav />
        <Products />
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
