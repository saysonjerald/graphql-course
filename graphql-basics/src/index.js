import {createServer} from "@graphql-yoga/node"
import {v4 as randomID} from 'uuid'

// Scalar Types: Strings, Boolean, Int, Float, ID, - can store single value

const typeDefs = `
    type Query {
        post: Post!
        user: User!
        greetings(name:String): String!
        add(a: Float!, b: Float!): Float!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: String!
    }
`

const resolvers = {
    Query: {
        post: () => {
            return {
                id: randomID(),
                title: 'The Art of War',
                body: 'This is the introduction of the Art of War by Tsu-chan',
                published: 2008
            }
        },
        user: () => {
            return {
                id: randomID(),
                name: 'Jerald Sayson',
                email: 'example@gmail.com',
                age: 34
            }
        },
        greetings: (parent, arg, ctx, info) => {
            return arg.name ? `Hello ${arg.name}`: 'Hello'
        },
        add: (parent, arg) => {
            const {a, b} = arg;
            return a + b;
        }
    }
}

const server = createServer({
    schema: {
        typeDefs,
        resolvers
    },
    port: 3456
})

server.start(() => {
    console.log("The server is running");
})