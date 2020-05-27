import { GraphQLServer } from 'graphql-yoga'

//Scalar Types - String, Boolean, Int, Float, ID

//Demo User Data
const users = [
    {
    _id: "1",
    name: "Kenneth",
    email: "kennmasing@gmail.com",
    age: 29
    },{
    _id: "2",
    name: "Taye",
    email: "tayemasing@gmail.com",
    age: 54
    },{
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
        published: true
    },
    {
        _id: "2",
        title: "Structural Materials",
        body: "Advanced Intro to Structural Materials",
        published: true
    },
    {
        _id: "3",
        title: "History of Architecture",
        body: "Intermediate to History of Architecture",
        published: false
    },
]

// TYPE DEFINITIONS (APPLICATION SCHEMA)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        _id: ID!
        title: String!
        body: String!
        published: Boolean
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

            // if(args.title){
            //     return posts.filter((post) => {
            //         return post.title.toLowerCase().includes(args.query.toLowerCase())
            //     })
            // } else if(args.body){
            //     return posts.filter((post) => {
            //         return post.body.toLowerCase().includes(args.query.toLowerCase())
            //     })   
            // } else if(args.published) {
            //     return posts.find({published: args.published})
            // }

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
    } 
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up')
})