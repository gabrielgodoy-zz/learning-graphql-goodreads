const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'BookType',
  description: '...',

  fields: () => {
    const AuthorType = require('./Author');

    return {
      title: {
        type: GraphQLString,
        args: {
          lang: { type: GraphQLString },
        },
        resolve: (xml, args) => {
          const title = xml.GoodreadsResponse.book[0].title[0];
          return args.lang ? translate(args.lang, title) : title;
        },
      },
      isbn: {
        type: GraphQLString,
        resolve: xml => xml.GoodreadsResponse.book[0].isbn[0],
      },
      authors: {
        type: new GraphQLList(AuthorType),
        resolve: (xml, args, { authorLoader }) => {
          const authorElements = xml.GoodreadsResponse.book[0].authors[0].author;
          const ids = authorElements.map(elem => elem.id[0]);

          return authorLoader.loadMany(ids);
        },
      },
    };
  },
});
