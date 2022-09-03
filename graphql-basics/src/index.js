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
        id: '201',
        title: 'Art of War',
        body: 'This is the introduction of the art of war',
        published: "06-02-1934",
        author: '1'
    },
    {
        id: '202',
        title: 'The Lorem Ipsum',
        body:  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus consequuntur ut, eaque veritatis tenetur expedita facilis necessitatibus odio nulla quam.",
        published: "07-02-1943",
        author: '2'
    },
    {
        id: '203',
        title: 'The Read Power of Low',
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, accusamus!",
        published: "12-02-2014",
        author: '3'
    }
];

const commentData = [
    {
        id: 100,
        textField: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, reprehenderit!",
        author: '1',
        post: '201'
    },
    {
        id: 101,
        textField: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, reprehenderit!",
        author: '3',
        post: '203'
    },
    {
        id: 102,
        textField: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, reprehenderit!",
        author: '3',
        post: '202'
    },
    {
        id: 103,
        textField: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, reprehenderit!",
        author: '2',
        post: '203'
    },
]

const typeDefs = `
    type Query {
        post: Post!
        user: User!
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: String!
        author: User!
        comments: [Comment!]!
    }
    
    type Comment {
        id: ID!
        textField: String!
        author: User!
        post: Post!
    }
`

const resolvers = {
    Query: {
        user: () => {
            return {
                id: randomID(),
                name: 'Jerald Sayson',
                email: 'example@gmail.com',
                age: 34
            }
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
        comments: (parent, arg) => {
            return commentData;
        }
    },
    Post: {
        author: (parent) => {
            return usersData.find((user) => {
                return user.id === parent.author;
            })
        },
        comments: (parent) => {
            return commentData.filter((comment) => {
                return comment.post === parent.id;
            })
        }
    },
    User: {
        posts: (parent) => {
            return postData.filter((post) => {
                return post.author === parent.id;
            })
        },
        comments: (parent) => {
            return commentData.filter((comment)=> {
                return comment.author === parent.id;
            })
        }
    },
    Comment: {
        author: (parent) => {
            return usersData.find((user) => {
                return user.id === parent.author;
            })
        },
        post: (parent) => {
            return postData.find((post)=> {
                return post.id === parent.post;
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