import { graphqlRequest } from '.'

export async function getCompany(id) {
    const query = ` query CompanyQuery($id: ID!) {
        company(id: $id) {
            id
            name
            description
            jobs {
                id
                title
            }
        }
    }
    `
    const data = await graphqlRequest(query, { id })
    
    return data.company
}