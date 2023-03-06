import 'reflect-metadata'
import {buildSchema} from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import path from 'path'
import { resolvers } from "@generated/type-graphql";
import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient()

  interface Context {
    prisma: PrismaClient;
  }

  const schema = await buildSchema({
    resolvers,
    validate: false,
    emitSchemaFile: path.resolve(__dirname, 'schema.gql')
  })

  const server = new ApolloServer({
    schema,
    context: (): Context => ({ prisma })
  })

  const { url } = await server.listen()

  console.log('Server running on ' + url)
}

main()