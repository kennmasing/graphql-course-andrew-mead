import { GraphQLServer } from 'graphql-yoga'

//Scalar Types - String, Boolean, Int, Float, ID

// TYPE DEFINITIONS (APPLICATION SCHEMA)
const typeDefs = `
    type Query {
        greeting(name: String, position: String): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
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
        greeting(parent, args, ctx, info) {
            if(args.name && args.position) {
                return `Hello, ${args.name}! You are my favorite ${args.position}.`
            } else {
                return `Hello!`
            }
        },
        add(parent, args, ctx, info) {
            if(args.numbers.length === 0){
                return 0
            }

            // [1,5,10,2]
            return args.numbers.reduce((accumulator, currentValue) => {
                return accumulator + currentValue
            })
        },
        grades(parent, args, ctx, info) {
            return [99, 80, 93]
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