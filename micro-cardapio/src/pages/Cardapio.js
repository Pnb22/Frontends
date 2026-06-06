import React from "react";
import DishCard from "../components/DishCard";
import pratos from "../data/pratos";
import "../styles/cardapio.css";

export default function Cardapio() {
  return (
    <section className="cardapio-mf" aria-labelledby="cardapio-title">
      <div className="cardapio-mf__header">
        <div>
          <p>Mais pedidos hoje</p>
          <h2 id="cardapio-title">Escolha seu prato</h2>
        </div>

        <span>{pratos.length} opções</span>
      </div>

      <div className="cardapio-grid">
        {pratos.map((prato) => (
          <DishCard key={prato.id} prato={prato} />
        ))}
      </div>
    </section>
  );
}
