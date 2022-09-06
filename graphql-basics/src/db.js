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

const db = {
    usersData,
    postData,
    commentData
}

export {db as default};