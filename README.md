# Interview code challenge.

## How to turn

```
npm run test:unit
```

## Observações:

Considerações sobre os erros de sintaxe que cometi.

- O nome correto das classes são ReadStream, WriteStream e Transform
- O primeiro parâmetro da função transform (chunk) é um dado binário de buffer e não string.
- É necessário fazer o parse do chunk para extrair as linhas dele e trata-las de uma vez.
- Em vez de chamar cb(null, data) alterei para chamar this.push(). Obs: depois alterei para arrow function e usei transformStream.push() por causa de conflito com o Jest.
- Implementei testes unitários para assegurar a execução correta do código.
