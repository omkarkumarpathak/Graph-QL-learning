import express from 'express';
import cors from 'cors'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import {
  ApolloServerPluginLandingPageLocalDefault
} from '@apollo/server/plugin/landingPage/default';
import axios from 'axios';
import bodyParser from 'body-parser';

const todos = [
  { id: '1', title: 'Learn GraphQL', completed: false },
  { id: '2', title: 'Build Apollo Server', completed: true }
];

const typeDefs = `
  type Todo {
    id: ID!
    title: String!
    completed: Boolean
  }
  type Query {
    getTodos: [Todo]
  }
`;

// const resolvers = {
//   Query: {
//     getTodos: () => todos  // <-- return the array here
//   }
// };

async function startServer() {

  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers:{
        Query: {
            getTodos:async ()=>(await axios.get('https://jsonplaceholder.typicode.com/todos')).data
        }
    },
 });

  await server.start();

  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server)
  );

  app.listen(8000, () =>
    console.log('Server ready at http://localhost:8000/graphql')
  );
}

startServer(); 
