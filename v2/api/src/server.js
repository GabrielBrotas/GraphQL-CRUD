import cors from'cors'
import express from'express'
import jwt from'jsonwebtoken'
import expressJwt from 'express-jwt'
import { ApolloServer, gql } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import fs from 'fs'

import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url)) // nova forma de pegar o dirname

import db from'./db.js'
import resolvers from './graphql/resolvers.js'

const PORT = 9000;
const JWT_SECRET = 'Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt'
const jwtSecret = Buffer.from(JWT_SECRET, 'base64');

const app = express();
const httpServer = http.createServer(app)

app.use(
  cors(), 
  express.json(),
  expressJwt({
    secret: jwtSecret,
    credentialsRequired: false,
    algorithms: ['HS256'] 
  })
);

// enconding utf8 is to read as a string and not as a binary file
const typeDefs = gql(
  fs.readFileSync(resolve(__dirname, 'graphql', 'schema.graphql'), {encoding: 'utf8'})
) 

async function startApolloServer(GQLtypeDefs, GQLresolvers) {
  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    typeDefs: GQLtypeDefs,
    resolvers: GQLresolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => ({
      user: req?.user?.sub
    })
  });

  await server.start();
  
  // use the express app as a middleware to run the both and the path to graphql routes
  server.applyMiddleware({
    app,
    // By default path is /graphql but is good to explict
    path: '/graphql'
  });

  // Modified server startup
  await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:9000${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers)

app.post('/login', (req, res) => {
  const {email, password} = req.body;
  const user = db.users.list().find((user) => user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({sub: user.id}, jwtSecret);
  res.send({token});
});

process.once('SIGUSR2', function () {
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, 'SIGINT');
});