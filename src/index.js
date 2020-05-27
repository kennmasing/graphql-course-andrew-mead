import { GraphQLServer } from 'graphql-yoga'

//Scalar Types - String, Boolean, Int, Float, ID

//Demo User Data
const users = [
    {
        _id: "1",
        name: "Kenneth",
        email: "kennmasing@gmail.com",
        age: 29
    },
    {
        _id: "2",
        name: "Taye",
        email: "tayemasing@gmail.com",
        age: 54
    },
    {
        _id: "3",
        name: "Evelyn",
        email: "lovemasing@gmail.com",
        age: 46  
    }
]

//Demo Post Data
const posts = [
    {
        _id: "1",
        title: "Urban Planning",
        body: "Intro to Urban Planning & Architecture",
        published: true,
        author: "1"
    },
    {
        _id: "2",
        title: "Structural Materials",
        body: "Advanced Intro to Structural Materials",
        published: true,
        author: "1"
    },
    {
        _id: "3",
        title: "History of Architecture",
        body: "Intermediate to History of Architecture",
        published: false,
        author: "2"
    },
]

//Demo Comments
const comments = [
    {
        _id: "1",
        text: "This is great!",
        author: "3",
        post: "1"
    },
    {
        _id: "2",
        text: "すばらしい!",
        author: "1",
        post: "3"
    },
    {
        _id: "1",
        text: "すごい！",
        author: "1",
        post: "3"
    },
    {
        _id: "1",
        text: "Congrats on getting published!",
        author: "2",
        post: "2"

    },
]

// TYPE DEFINITIONS (APPLICATION SCHEMA)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        _id: ID!
        title: String!
        body: String!
        published: Boolean
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        _id: ID!
        text: String!
        author: User!
        post: Post!
    }
`

// RESOLVERS
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if(!args.query){
                return users
            }     
            
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })

        },
        posts(parent, args, ctx, info) {
            if(!args.query){
                return posts
            }

            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())

                return isTitleMatch || isBodyMatch
            })   
        },
        comments(parent, args, ctx, info) {
            return comments
        },
        me() {
            return {
                _id: '123098',
                name: 'Taye',
                email: 'tayemasing@gmail.com',
                // age: '53'
            }
        },
        post() {
            return {
                _id: '123123',
                title: 'GraphQL Course',
                body: '2018 tutorial for GraphQL by Andrew Mead',
                published: false
            }
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user._id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent._id
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent._id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent._id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user._id === parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post._id === parent.post
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up')
})