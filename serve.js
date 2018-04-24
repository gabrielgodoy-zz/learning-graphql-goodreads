const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const DataLoader = require('dataloader');

const schema = require('./schema');
const { fetchAuthor, fetchBook } = require('./fetchers');

app.use(
  '/graphql',
  graphqlHTTP(req => {
    /*
      Função dentro do DataLoader recebe um array de chaves
      E promete retornar um array de valores para cada uma dessas chaves
      Nesse caso é um array de IDs de Authors

      Abaixo a função fetchAuthor original, recebeu um id através de args.id
      Mas quando se usa o DataLoader esse id, vira um array com o id dentro
    */
    const authorLoader = new DataLoader(keys => Promise.all(keys.map(fetchAuthor)));
    const bookLoader = new DataLoader(keys => Promise.all(keys.map(fetchBook)));

    return {
      schema,
      context: {
        authorLoader,
        bookLoader,
      },
      graphiql: true,
    };
  }),
);

app.listen(4000);
console.log('Listening ...');
