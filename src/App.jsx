import React, { useState } from "react";
import "./App.css";
import productsData from "./data/products";

function App() {
  const [cart, setCart] = useState([]);

  const updateCartItem = (productId, updateFunction) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? updateFunction(item) : item
      )
    );
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      updateCartItem(product.id, (item) => ({
        ...item,
        quantity: item.quantity + 1,
      }));
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantityModifier) => {
    updateCartItem(productId, (item) => ({
      ...item,
      quantity: Math.max(1, item.quantity + quantityModifier),
    }));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div className="product-list">
          {productsData.map((product) => (
            <div className="product" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <button onClick={() => addToCart(product)}>Add to cart</button>
            </div>
          ))}
        </div>
      </section>
      <hr />

      <section className="cart">
        <h1 className="cart-heading">
          Cart (Total Price is {calculateTotalPrice()} Baht)
        </h1>
        <div className="cart-item-list">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <h1>Item name: {item.name}</h1>
              <h2>Price: {item.price} Baht</h2>
              <h2>Quantity: {item.quantity}</h2>
              <button
                className="delete-button"
                onClick={() => removeFromCart(item.id)}
              >
                x
              </button>
              <div className="quantity-actions">
                <button
                  className="add-quantity"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>
                <button
                  className="subtract-quantity"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
