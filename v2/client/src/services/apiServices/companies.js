import gql from 'graphql-tag'
import client from '../api'

export async function getCompany(id) {
    const query = gql`
        query CompanyQuery($id: ID!) {
            company(id: $id) {
                id
                name
                description
                jobs {
                    id
                    title
                }
            }
    }`
    const {data: { company }} = await client.query({query, variables: { id }})
    
    return company
}