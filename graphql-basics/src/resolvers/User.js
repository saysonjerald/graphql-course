const User = {
    posts: (parent, arg, {db}) => {
        return db.postData.filter((post) => {
            return post.author === parent.id;
        })
    },
    comments: (parent, arg, {db}) => {
        return db.commentData.filter((comment)=> {
            return comment.author === parent.id;
        })
    }
}

export {User as default}