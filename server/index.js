import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";

async function startServer() {

  const app = express();
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs:`
          type ToDO{ 
            id : ID!
            title : String!
            completed : Boolean!
          }

          type Query {
              getToDo : [ToDO]
          }
        `,
      resolvers:{
        
      }
  });

  app.use(bodyParser.json());
  app.use(cors());
  await server.start();

  app.use("/graphql", expressMiddleware(server));
  app.use(express.json());
  //   const port = process.env.PORT || 3000;
  app.listen(8000, () => {
    console.log("server is running ");
  });
}

startServer();
