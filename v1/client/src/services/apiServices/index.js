import {getAccessToken, isLoggedIn} from './auth'

const endpoint = 'http://localhost:9000/graphql'
export async function graphqlRequest(query, variables = {}) {
    const request = {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            query,
            variables
        })
    }
    
    if(isLoggedIn()) {
        request.headers['authorization'] = `Bearer ${getAccessToken()}`;
    }

    const response = await fetch(endpoint, request)
    
    const body = await response.json()

    if(body.errors) {
        const message = body.errors.map(e => e.message).join('\n')
        throw new Error(message)
    }
    
    return body.data
}