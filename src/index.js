import { GraphQLServer } from 'graphql-yoga'

//Scalar Types - String, Boolean, Int, Float, ID



// TYPE DEFINITIONS (APPLICATIN SCHEMA)
const typeDefs = `
    type Query {
        title: String!
        price: Int!
        releaseYear: Int
        rating: Float
        inStock: Boolean
    }
`

// RESOLVERS
const resolvers = {
    Query: {
        title() {
            return 'Bibingka'
        },
        price() {
            return 60
        }, 
        releaseYear() {
            return 1981
        },
        rating() {
            return 4.98
        },
        inStock() {
            return true
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