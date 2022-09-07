import {GraphQLYogaError} from '@graphql-yoga/node'
import {v4 as randomID} from 'uuid';

const Mutation = {
    createUser: (parent, arg, {db}, info) => {
        const isUserExist = db.usersData.some((user)=> user.email === arg.data.email);

        if(isUserExist) {
            throw new GraphQLYogaError("User already exist 😢.");
        }

        const user = {
            id: randomID(),
            ...arg.data,
        }

        db.usersData.push(user);
        return user;
    },
    updateUser: (parent, args, {db}) => {
        const {id, data} = args;
        const user = db.usersData.find((user) => user.id === id);

        if(!user) {
            throw new GraphQLYogaError("User not found");
        }   

        if(typeof data.email === 'string') {
            const emailTaken = db.usersData.some((user) => user.email === data.email);

            if(emailTaken) {
                throw new GraphQLYogaError("Email taken");
            };

            user.email = data.email;
        }

        if(typeof data.name === 'string'){
            user.name = data.name;
        }

        if(typeof data.age !== 'undefined'){
            user.age = data.age;
        }

        return user;
    },
    deleteUser: (parent, arg, {db}, info) => {
        const userIndex = db.usersData.findIndex((user) => user.id === arg.id);

        if(userIndex === -1) {
            throw new GraphQLYogaError("User not found!");
        }

        const deleteUsers = db.usersData.splice(userIndex, 1);

        db.postData = db.postData.filter((post) => {
            const match = post.author === arg.id;

            if(match) {
                db.commentData = db.commentData.filter((comment) => comment.post !== post.post)
            }

            return !match;
        })

        db.commentData = db.commentData.filter((comment) => comment.author !== arg.id);

        return deleteUsers[0];
    },
    createPost: (parent, arg, {db}, info) => {
        const isAuthorExist = db.usersData.some((user) => user.id === arg.author);
        if(!isAuthorExist) {
            throw new GraphQLYogaError("Author didn't exist! 💥");
        }
        
        const post = {
            id: randomID(),
            ...arg
        }

        db.postData.push(post);

        return post;
    },
    updatePost: (parent, arg, {db}) => {
        const {id, data} = arg;
        const post = db.postData.find((post) => post.id === id);

        if(!post) {
            throw new GraphQLYogaError("Post not found");
        }

        if(typeof data.title === 'string'){
            post.title = data.title
        }

        if(typeof data.body === 'string') {
            post.body = data.body;
        }

        if(typeof data.published === 'boolean'){
            post.published = data.published;
        }

        return post;
    },
    deletePost: (parent, arg, {db}) => {
        const postIndex = db.postData.findIndex((post) => post.id === arg.id);

        if(postIndex === -1) {
            throw new GraphQLYogaError("Post not found!");
        }

        const deletePosts = db.postData.splice(postIndex, 1);

        db.commentData = db.commentData.filter((comment) => comment.post !== arg.id);

        return deletePosts[0];
    },
    createComment: (parent, arg, {db, pubsub}) => {
        const isAuthorExist = db.usersData.some((user) => user.id ===  arg.data.author);
        const isPostExist = db.postData.some((post) => {
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

        db.commentData.push(comment);
        pubsub.publish(`comment ${arg.data.post}`, comment);

        return comment;
    },
    updateComment: (parent, arg, {db}) => {
        const {id, data} = arg;
        const comment = db.commentData.find((comment) => comment.id == id);

        if(!comment) {
            throw new GraphQLYogaError("Comment not found!");
        }

        if(typeof data.textField === 'string'){
            comment.textField = data.textField;
        }

        return comment;
    },
    deleteComment: (parent, arg, {db}) => {
        const commentIndex = db.commentData.findIndex((comment) => comment.id === arg.id);

        if(db.commentData === -1) {
            throw new GraphQLYogaError("Comment not found!");
        }

        const deletedComments = db.commentData.splice(commentIndex, 1);

        db.commentData = db.commentData.filter((comment) => comment.id !== arg.id);

        return deletedComments[0];
    }
}

export {Mutation as default}