import { graphqlRequest } from '.'

export async function loadJobs() {
    try {
        const query = `query {
            jobs {
                id
                title
                company {
                    id
                    name
                }
            }
        }
        `
    
        const data = await graphqlRequest(query)
        
        return data.jobs
    } catch(err) {
        throw new Error(err)
    }
}

export async function createJob(input) {
    const mutation = `mutation CreateJob($input: CreateJobInput) {
        job: createJob(input: $input) {
          id
          title
          description
          company {
            id
            name
          }
        }
    }
    `

    const { job } = await graphqlRequest(mutation, { input });

    return job
}

export async function getJob(id) {
        const query = ` query JobQuery($id: ID!) {
            job(id: $id) {
                id
                title
                description
                company {
                    id
                    name
                }
            }
        }
        `
        const data = await graphqlRequest(query, { id })
    
        return data.job
}