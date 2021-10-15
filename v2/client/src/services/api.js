import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost'

import {getAccessToken, isLoggedIn} from './apiServices/auth'

const endpoint = 'http://localhost:9000/graphql'

// operation => graphql query or mutation to be executed
// forward => next step, chain multiple steps together
const authLink = new ApolloLink((operation, forward) => {
    if(isLoggedIn()) {
        // request.headers['authorization'] = `Bearer ${getAccessToken()}`;
        operation.setContext({
            headers: {
                'authorization': `Bearer ${getAccessToken()}`
            }
        })
    }
    return forward(operation)
})

const client = new ApolloClient({
    link: ApolloLink.from([
        authLink, // executed first
        new HttpLink({ uri: endpoint }) // do the request
    ]),
    cache: new InMemoryCache()
})

export default client