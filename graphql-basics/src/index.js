import {createServer} from "@graphql-yoga/node"

const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`

const resolvers = {
    Query: {
        hello: () => 'Hello everyone!',
        name: () => 'Jerald Sayson',
        location: () => 'Cebu City',
        bio: () => 'I am a junior web developer!'
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