const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Author',
  description: '...',

  fields: () => {
    const BookType = require('./Book');

    return {
      name: {
        type: GraphQLString,
        resolve: xml => xml.GoodreadsResponse.author[0].name[0],
      },
      books: {
        type: new GraphQLList(BookType),
        resolve: (xml, args, { bookLoader }) => {
          const ids = xml.GoodreadsResponse.author[0].books[0].book.map(
            elem => elem.id[0]._,
          );
          return bookLoader.loadMany(ids);
        },
      },
    };
  },
});
