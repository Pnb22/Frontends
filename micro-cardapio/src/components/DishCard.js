import React, { useState } from "react";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

export default function DishCard({ prato }) {
  const [feedback, setFeedback] = useState(false);

  function handleAddToOrder() {
    const item = {
      id: prato.id,
      nome: prato.nome,
      preco: prato.preco
    };

    // O evento global deixa o cardápio independente de qualquer implementação do pedido.
    window.dispatchEvent(
      new CustomEvent("add-item", {
        detail: item
      })
    );

    setFeedback(true);
    window.setTimeout(() => setFeedback(false), 900);
  }

  return (
    <article className="cardapio-card">
      <img className="cardapio-card__image" src={prato.imageUrl} alt={prato.nome} loading="lazy" />

      <div className="cardapio-card__content">
        <div className="cardapio-card__header">
          <h3>{prato.nome}</h3>
          <strong>{currencyFormatter.format(prato.preco)}</strong>
        </div>

        <p>{prato.descricao}</p>

        <div className="cardapio-card__actions">
          <button type="button" onClick={handleAddToOrder}>
            Adicionar ao Pedido
          </button>

          <span aria-live="polite">{feedback ? "Adicionado" : ""}</span>
        </div>
      </div>
    </article>
  );
}
