import {GraphQLYogaError} from "@graphql-yoga/node"

const Subscription = {
    comment: {
        subscribe: (parent, {postId}, { pubsub, db }, info) => {
            const post = db.postData.find((post) => post.id === postId && post.published);

            if(!post) {
                throw new GraphQLYogaError("No post found!");
            }

            return pubsub.subscribe(`comment ${postId}`);
        },
        resolve: (payload) => payload,
    }
}

export {Subscription as default}