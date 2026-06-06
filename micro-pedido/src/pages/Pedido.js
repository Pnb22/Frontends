import React, { useEffect, useMemo, useState } from "react";
import OrderItem from "../components/OrderItem";
import "../styles/pedido.css";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

export default function Pedido() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    function handleAddItem(event) {
      const item = event.detail;

      if (!item || !item.id) {
        return;
      }

      setItems((currentItems) => {
        const existingItem = currentItems.find((currentItem) => currentItem.id === item.id);

        if (existingItem) {
          return currentItems.map((currentItem) =>
            currentItem.id === item.id
              ? { ...currentItem, quantidade: currentItem.quantidade + 1 }
              : currentItem
          );
        }

        return [
          ...currentItems,
          {
            id: item.id,
            nome: item.nome,
            preco: Number(item.preco),
            quantidade: 1
          }
        ];
      });
    }

    // O listener global recebe itens de qualquer micro frontend carregado na mesma janela.
    window.addEventListener("add-item", handleAddItem);

    return () => {
      window.removeEventListener("add-item", handleAddItem);
    };
  }, []);

  const total = useMemo(
    () => items.reduce((accumulator, item) => accumulator + item.preco * item.quantidade, 0),
    [items]
  );

  function handleIncrease(id) {
    setItems((currentItems) =>
      currentItems.map((item) => (item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item))
    );
  }

  function handleDecrease(id) {
    setItems((currentItems) =>
      currentItems
        .map((item) => (item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item))
        .filter((item) => item.quantidade > 0)
    );
  }

  function handleRemove(id) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }

  function handleClearOrder() {
    setItems([]);
  }

  return (
    <section className="pedido-mf" aria-labelledby="pedido-title">
      <div className="pedido-mf__header">
        <div>
          <p>Seu pedido</p>
          <h2 id="pedido-title">Resumo</h2>
        </div>

        <span>{items.length} itens</span>
      </div>

      {items.length === 0 ? (
        <div className="pedido-empty">
          <strong>Nenhum item no pedido</strong>
          <span>Escolha um prato no cardápio para começar.</span>
        </div>
      ) : (
        <>
          <div className="pedido-list">
            {items.map((item) => (
              <OrderItem
                key={item.id}
                item={item}
                onDecrease={handleDecrease}
                onIncrease={handleIncrease}
                onRemove={handleRemove}
              />
            ))}
          </div>

          <footer className="pedido-total">
            <span>Total</span>
            <strong>{currencyFormatter.format(total)}</strong>
          </footer>

          <button type="button" className="pedido-clear" onClick={handleClearOrder}>
            Limpar pedido
          </button>
        </>
      )}
    </section>
  );
}
