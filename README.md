<div align="center">

# React Tree App 🌲

## Projeto online

<a href="https://react-tree-app-nine.vercel.app">Disponível aqui.<a/>

## Como rodar o projeto

```bash
npm run install
```

```bash
npm run dev
```

## Como rodar os testes unitários

```bash
npm run test
```

## Features

<div align="left">

- Testes unitários de todas as utils e componentes
- Cada item possui um checkbox que pode ser ativado ou desativado
- Quando um usuário marcar um nó pai, o estado é replicado para todos os filhos atrelados aquele nó, a mesma coisa acontece se o nó pai for desativado
- Quando o usuário marcar um ou mais filhos, e até que marque todos, o estado do checkbox pai deve ser alterado para indeterminate
- Caso um usuário marque todos os filhos atrelados a um nó, o nó pai também deve ser marcado, se todos os filhos forem desmarcados, o nó pai também deve ser desmarcado
- É exibido um botão onde o usuário pode mostrar ou esconder os filhos atrelados a um nó
- Caso o usuário atualize a aplicação, o estado dos checkboxes são recuperados do localStorage e exibidos
- Foco na usabilidade, experiência do usuário e performance

</div>
