import {createServer} from "@graphql-yoga/node"
import {v4 as randomID} from 'uuid'

// Scalar Types: Strings, Boolean, Int, Float, ID, - can store single value

const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float 
    }
`

const resolvers = {
    Query: {
        id: () => randomID(),
        name: () => 'Jerald Sayson',
        age: () => 34,
        employed:() => false,
        gpa: () => null
    }
}

const server = createServer({
    schema: {
        typeDefs,
        resolvers
    }
})

server.start(() => {
    console.log("The server is running");
})