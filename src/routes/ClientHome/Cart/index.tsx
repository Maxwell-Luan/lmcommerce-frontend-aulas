import { useState } from "react";
import "./styles.css";

const cart = {
  items: [
    {
      productId: 4,
      quantity: 1,
      name: "PC Gamer",
      price: 1200,
      imgUrl:
        "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/4-big.jpg",
    },
    {
      productId: 5,
      quantity: 2,
      name: "Rails for Dummies",
      price: 100.99,
      imgUrl:
        "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/5-big.jpg",
    },
  ],
};

export default function Cart() {
  return (
    <main>
      <section id="cart-container-section" className="dsc-container">
        <div className="dsc-card mb20">
          {cart.items.map((item) => (
            <div
              key={item.productId}
              className="dsc-cart-item-container dsc-line-bottom"
            >
              <div>
                <img src={item.imgUrl} alt={item.name} />
              </div>
              <div className="dsc-cart-position-items">
                <div>
                  <h3>{item.name}</h3>
                  <div className="dsc-cart-item-quantity-container">
                    <div>-</div>
                    <p>{item.quantity}</p>
                    <div>+</div>
                  </div>
                </div>
                <div className="dsc-cart-item-right">
                  R${item.price * item.quantity}
                </div>
              </div>
            </div>
          ))}
          <div className="dsc-cart-total-container">
            <h3>
              Total: R${" "}
              {cart.items.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}
            </h3>
          </div>
        </div>
        <div className="dsc-btn-page-container">
          <div className="dsc-btn dsc-btn-blue">Finalizar pedido</div>
          <div className="dsc-btn dsc-btn-white">Continuar comprando</div>
        </div>
      </section>
    </main>
  );
}
