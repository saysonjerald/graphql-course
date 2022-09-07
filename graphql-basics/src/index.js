import {createServer, createPubSub} from "@graphql-yoga/node";
import { makeExecutableSchema } from "@graphql-tools/schema";
import schema from './schema';
import db from './db'; 
import Comment from './resolvers/Comment'
import Mutation from './resolvers/Mutation'
import Post from './resolvers/Post'
import Query from './resolvers/Query'
import User from './resolvers/User'
import Subscription from "./resolvers/Subscription";

const pubsub = createPubSub();

const server = createServer({
    schema: makeExecutableSchema({
        typeDefs: schema,
        resolvers: {
            Mutation,
            Comment,
            Post,
            Query,
            User,
            Subscription,
        },
    }),
    context: {
        db,
        pubsub
    },
    port: 3456
})

server.start(() => {
    console.log("The server is running");
})