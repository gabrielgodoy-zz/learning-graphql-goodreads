const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema');
const DataLoader = require('dataloader');

const { fetchAuthor, fetchBook } = require('./fetchers');

app.use(
  '/graphql',
  graphqlHTTP(req => {
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
