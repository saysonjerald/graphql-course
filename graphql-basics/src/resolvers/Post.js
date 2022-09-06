const Post = {
    author: (parent, arg, {db}) => {
        return db.usersData.find((user) => {
            return user.id === parent.author;
        })
    },
    comments: (parent, arg, {db}) => {
        return db.commentData.filter((comment) => {
            return comment.post === parent.id;
        })
    }
}

export {Post as default}