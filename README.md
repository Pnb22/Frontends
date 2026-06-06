# Food Delivery MFE

Projeto em React com arquitetura de Micro Frontends usando Webpack 5 e Module Federation. A aplicação simula um app de delivery dividido em três partes independentes: um container principal, um micro frontend de cardápio e um micro frontend de pedido.

## Descrição do Projeto

O `container` é a aplicação principal. Ele não conhece os detalhes internos dos micros, apenas consome os módulos remotos publicados pelo Webpack Module Federation:

- `micro-cardapio` expõe `./Cardapio`.
- `micro-pedido` expõe `./Pedido`.

Cada micro frontend pode ser executado isoladamente durante o desenvolvimento, mas também pode ser carregado pelo container em tempo de execução por meio dos arquivos `remoteEntry.js`.

## Tecnologias

- React
- JavaScript
- Webpack 5
- Webpack Dev Server
- Module Federation
- Babel
- CSS puro

## Estrutura

```text
micro-frontends/
│
├── container/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── webpack.config.js
│
├── micro-cardapio/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── webpack.config.js
│
└── micro-pedido/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── styles/
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── webpack.config.js
```

## Instalação

Abra três terminais, um para cada aplicação.

### 1. Micro Cardápio

```bash
cd micro-cardapio
npm install
npm start
```

Disponível em:

```text
http://localhost:3001
```

### 2. Micro Pedido

```bash
cd micro-pedido
npm install
npm start
```

Disponível em:

```text
http://localhost:3002
```

### 3. Container

```bash
cd container
npm install
npm start
```

Disponível em:

```text
http://localhost:3000
```

Execute primeiro os micros `micro-cardapio` e `micro-pedido`, depois execute o `container`.

## Comunicação entre Micros

A comunicação entre os micros acontece por eventos globais do navegador. Essa estratégia mantém os micros desacoplados: o cardápio não importa nenhuma função do pedido, e o pedido não conhece a implementação do cardápio.

Quando o usuário clica em **Adicionar ao Pedido**, o `micro-cardapio` dispara:

```javascript
window.dispatchEvent(
  new CustomEvent("add-item", {
    detail: item
  })
);
```

O `micro-pedido` escuta o mesmo evento:

```javascript
window.addEventListener("add-item", (event) => {
  // Atualiza o pedido com event.detail.
});
```

Assim que o evento é recebido, o pedido atualiza a quantidade do item em tempo real e recalcula o subtotal e o valor total.

## Module Federation

### Container

O container consome os remotes:

```javascript
remotes: {
  cardapio: "cardapio@http://localhost:3001/remoteEntry.js",
  pedido: "pedido@http://localhost:3002/remoteEntry.js"
}
```

### Micro Cardápio

O cardápio expõe:

```javascript
exposes: {
  "./Cardapio": "./src/pages/Cardapio"
}
```

### Micro Pedido

O pedido expõe:

```javascript
exposes: {
  "./Pedido": "./src/pages/Pedido"
}
```

## Resultado Esperado

Ao abrir `http://localhost:3000` com os três servidores rodando:

1. O container carrega o Micro Cardápio e o Micro Pedido via Module Federation.
2. O usuário clica em **Adicionar ao Pedido** em qualquer card de prato.
3. O Micro Cardápio dispara o evento global `add-item`.
4. O Micro Pedido recebe o evento e atualiza o pedido em tempo real.
5. A quantidade, o subtotal e o total do pedido são recalculados automaticamente.
