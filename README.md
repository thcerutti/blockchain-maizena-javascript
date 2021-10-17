# Como fazer uma blockchain com Maizena e JavaScript

Exemplo de uma implementação de blockchain (extremanente simplificada), com validação de integridade dos blocos.

```
  genesis block            block 1                  block 2
 ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
 │data:'some data' │      │data:'some data2'│      │data:'some data3'│
 │hash:123ABCx0 ◄──┼──┐   │hash:f0X1a3x9 ◄──┼───┐  │hash:0x1ac873    │
 │previousBlockHash│  └───┤previousBlockHash│   └──┤previousBlockHash│  
 └─────────────────┘      └─────────────────┘      └─────────────────┘
 ```

## Rodando o projeto

Instalando a dependência (`Sha.js`): `npm install`

Rodando o projeto: `node .\app.js`