import {createServer} from "@graphql-yoga/node"
import {v4 as randomID} from 'uuid'

// Scalar Types: Strings, Boolean, Int, Float, ID, - can store single value

const usersData = [
    {
        id: '1',
        name: 'Jerald Sayson',
        email: 'example@gmail.com',
        age: 27,
    },
    {
        id: '2',
        name: 'Ian Nogas',
        email: 'example@gmail.com',
        age: 21,
    },
    {
        id: '3',
        name: 'Eugene Mosqueda',
        email: 'example@gmail.com',
        age: 26,
    },
    {
        id: '4',
        name: 'Roberto Dallas',
        email: 'example@gmail.com',
        age: 72,
    },

] 

const postData = [
    {
        id: randomID(),
        title: 'Art of War',
        body: 'This is the introduction of the art of war',
        published: "06-02-1934",
        author: '1'
    },
    {
        id: randomID(),
        title: 'The Lorem Ipsum',
        body:  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus consequuntur ut, eaque veritatis tenetur expedita facilis necessitatibus odio nulla quam.",
        published: "07-02-1943",
        author: '2'
    },
    {
        id: randomID(),
        title: 'The Read Power of Low',
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, accusamus!",
        published: "12-02-2014",
        author: '3'
    }
]

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        post: Post!
        user: User!
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
        author: User!
    }
`

const resolvers = {
    Query: {
        posts: (parent, arg) => {
            if(!arg.query) {
                return postData;
            }

            return postData.filter((post) => {
                const isPost =  post.title.toLowerCase().includes(arg.query.toLowerCase());
                const isBody =  post.body.toLowerCase().includes(arg.query.toLowerCase());

                return isPost || isBody;
            })
        },
        users: (parent, arg) => {
            if(!arg.query) {
                return usersData;
            }

            return usersData.filter((user)=> {
                return user.name.toLowerCase().includes(arg.query.toLowerCase());
            })
        },
        post: () => {
            return {
                id: randomID(),
                title: 'The Art of War',
                body: 'This is the introduction of the Art of War by Tsu-chan',
                published: 2008,
            }
        },
        user: () => {
            return {
                id: randomID(),
                name: 'Jerald Sayson',
                email: 'example@gmail.com',
                age: 34
            }
        }
    },
    Post: {
        author: (parent) => {
            return usersData.find((user) => {
                return user.id === parent.author;
            })
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