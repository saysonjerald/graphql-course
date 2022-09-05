import {createServer, GraphQLYogaError} from "@graphql-yoga/node"
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
        email: 'example1@gmail.com',
        age: 21,
    },
    {
        id: '3',
        name: 'Eugene Mosqueda',
        email: 'example2@gmail.com',
        age: 26,
    },
    {
        id: '4',
        name: 'Roberto Dallas',
        email: 'example3@gmail.com',
        age: 72,
    },

] 

const postData = [
    {
        id: '201',
        title: 'Art of War',
        body: 'This is the introduction of the art of war',
        published: false,
        author: '1'
    },
    {
        id: '202',
        title: 'The Lorem Ipsum',
        body:  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus consequuntur ut, eaque veritatis tenetur expedita facilis necessitatibus odio nulla quam.",
        published: true,
        author: '2'
    },
    {
        id: '203',
        title: 'The Read Power of Low',
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, accusamus!",
        published: true,
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

    
    input CreateUserInput {
        name: String!
        email: String!
        age: Int!
    }

    input CreatePostInput {
        title: String!
        body: String!
        published: Boolean!
        author: ID!
    }

    input CreateCommentInput {
        textField: String! 
        author: ID! 
        post: ID!
    }

    type Mutation {
        createUser(data: CreateUserInput): User!
        createPost(data: CreatePostInput): Post!
        createComment(data: CreateCommentInput): Comment!
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
        published: Boolean!
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
    Mutation: {
        createUser: (parent, arg, ctx, info) => {
            const isUserExist = usersData.some((user)=> user.email === arg.data.email);

            if(isUserExist) {
                throw new GraphQLYogaError("User already exist 😢.");
            }

            const user = {
                id: randomID(),
                ...arg.data,
            }

            usersData.push(user);
            return user;
        },
        createPost: (parent, arg, ctx, info) => {
            const isAuthorExist = usersData.some((user) => user.id === arg.author);
            if(!isAuthorExist) {
                throw new GraphQLYogaError("Author didn't exist! 💥");
            }
            
            const post = {
                id: randomID(),
                ...arg
            }

            postData.push(post);

            return post;
        },
        createComment: (parent, arg) => {
            const isAuthorExist = usersData.some((user) => user.id ===  arg.data.author);
            const isPostExist = postData.some((post) => {
                return post.published && post.id === arg.data.post;
            });

            if(!isAuthorExist) {
                throw new GraphQLYogaError("User didn't exist!");
            }

            if(!isPostExist) {
                throw new GraphQLYogaError("Post didn't exist!");
            }
           
            const comment = {
                id: randomID(),
                ...arg.data
            }

            commentData.push(comment);

            return comment;
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