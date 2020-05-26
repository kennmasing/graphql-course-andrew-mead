import { GraphQLServer } from 'graphql-yoga'

//Scalar Types - String, Boolean, Int, Float, ID

// TYPE DEFINITIONS (APPLICATION SCHEMA)
const typeDefs = `
    type Query {
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