const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { translate } = require('./fetchers');
const AuthorType = require('./types/Author');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
      author: {
        type: AuthorType,
        args: {
          id: { type: GraphQLInt },
        },
        resolve: (root, args, { authorLoader }) => authorLoader.load(args.id),
      },
    }),
  }),
});
