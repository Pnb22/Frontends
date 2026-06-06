import React from "react";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

export default function OrderItem({ item, onDecrease, onIncrease, onRemove }) {
  const subtotal = item.quantidade * item.preco;

  return (
    <article className="pedido-item">
      <div className="pedido-item__info">
        <h3>{item.nome}</h3>
        <span>{currencyFormatter.format(item.preco)} cada</span>
      </div>

      <div className="pedido-item__controls" aria-label={`Quantidade de ${item.nome}`}>
        <button type="button" onClick={() => onDecrease(item.id)} aria-label={`Diminuir ${item.nome}`}>
          -
        </button>
        <strong>{item.quantidade}</strong>
        <button type="button" onClick={() => onIncrease(item.id)} aria-label={`Aumentar ${item.nome}`}>
          +
        </button>
      </div>

      <strong className="pedido-item__subtotal">{currencyFormatter.format(subtotal)}</strong>

      <button type="button" className="pedido-item__remove" onClick={() => onRemove(item.id)}>
        Remover
      </button>
    </article>
  );
}
