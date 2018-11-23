'use strict';

const gql = s => `${s}`;

module.exports = gql`
  type Query {
    hello: String!
  }
`;
