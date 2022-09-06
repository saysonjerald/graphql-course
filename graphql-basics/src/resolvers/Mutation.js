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
    deletePost: (parent, arg, {db}) => {
        const postIndex = db.postData.findIndex((post) => post.id === arg.id);

        if(postIndex === -1) {
            throw new GraphQLYogaError("Post not found!");
        }

        const deletePosts = db.postData.splice(postIndex, 1);

        db.commentData = db.commentData.filter((comment) => comment.post !== arg.id);

        return deletePosts[0];
    },
    createComment: (parent, arg, {db}) => {
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