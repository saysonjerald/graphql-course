import {v4 as randomID} from 'uuid';

const Query = {
    user: () => {
        return {
            id: randomID(),
            name: 'Jerald Sayson',
            email: 'example@gmail.com',
            age: 34
        }
    },
    users: (parent, arg, { db }) => {
        if(!arg.query) {
            return db.usersData;
        }

        return db.usersData.filter((user)=> {
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
    posts: (parent, arg, {db}) => {
        if(!arg.query) {
            return db.postData;
        }

        return db.postData.filter((post) => {
            const isPost =  post.title.toLowerCase().includes(arg.query.toLowerCase());
            const isBody =  post.body.toLowerCase().includes(arg.query.toLowerCase());

            return isPost || isBody;
        })
    },
    comments: (parent, arg, {db}) => {
        return db.commentData;
    }
}

export {Query as default}