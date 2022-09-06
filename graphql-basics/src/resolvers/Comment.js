const Comment = {
    author: (parent, arg, {db}) => {
        return db.usersData.find((user) => {
            return user.id === parent.author;
        })
    },
    post: (parent, arg, {db}) => {
        return db.postData.find((post)=> {
            return post.id === parent.post;
        })
    }
}

export {Comment as default}