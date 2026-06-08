# Food Delivery MFE

Este projeto foi feito para uma atividade de Micro Frontends usando React, Webpack 5 e Module Federation.

A ideia foi separar um app de delivery em tres partes:

- `container`: aplicacao principal que junta os micros.
- `micro-cardapio`: mostra os pratos e envia o item escolhido.
- `micro-pedido`: recebe os itens e mostra o resumo do pedido.

## Tecnologias usadas

- React
- JavaScript
- Webpack 5
- Module Federation
- CSS puro
- Babel

## Estrutura do projeto

```text
micro-frontends/
|-- container/
|-- micro-cardapio/
`-- micro-pedido/
```

Cada app tem sua propria pasta `src`, seus componentes, estilos, `package.json` e `webpack.config.js`.

## Como rodar

Abra tres terminais, um para cada aplicacao.

### 1. Micro Cardapio

```bash
cd micro-cardapio
npm install
npm start
```

Roda em:

```text
http://localhost:3001
```

### 2. Micro Pedido

```bash
cd micro-pedido
npm install
npm start
```

Roda em:

```text
http://localhost:3002
```

### 3. Container

```bash
cd container
npm install
npm start
```

Roda em:

```text
http://localhost:3000
```

Importante: primeiro rode o `micro-cardapio` e o `micro-pedido`. Depois rode o `container`.

## Como funciona a comunicacao

O `micro-cardapio` nao chama diretamente o `micro-pedido`. Ele dispara um evento global no navegador quando o usuario clica em **Adicionar ao Pedido**.

```javascript
window.dispatchEvent(
  new CustomEvent("add-item", {
    detail: item
  })
);
```

O `micro-pedido` fica escutando esse evento:

```javascript
window.addEventListener("add-item", (event) => {
  // atualiza o pedido
});
```

Com isso, quando um prato e adicionado no cardapio, o pedido atualiza sozinho no container.

## Module Federation

O container consome os dois micros:

```javascript
cardapio: "cardapio@http://localhost:3001/remoteEntry.js",
pedido: "pedido@http://localhost:3002/remoteEntry.js"
```

O `micro-cardapio` expoe:

```javascript
"./Cardapio"
```

O `micro-pedido` expoe:

```javascript
"./Pedido"
```

## Resultado esperado

Ao abrir `http://localhost:3000`, o usuario deve ver o cardapio e a area do pedido.

Quando clicar em **Adicionar ao Pedido**, o item aparece no pedido com quantidade, preco, subtotal e total.
