import gql from 'graphql-tag'

import client from '../api'

const jobDetailsFragment = gql`
    fragment JobDetail on Job {
        id
            title
            description
            company {
                id
                name
            }
    }
`

const loadJobsQuery = gql`
    query JobsQuery {
        jobs {
            ...JobDetail
        }
    }

    ${jobDetailsFragment}
`

const getJobQuery = gql`
    query JobQuery($id: ID!) {
        job(id: $id) {
            ...JobDetail
        }
    }

    ${jobDetailsFragment}
`

const createJobMutation = gql`
    mutation CreateJob($input: CreateJobInput) {
        job: createJob(input: $input) {
            ...JobDetail
        }
    }

    ${jobDetailsFragment}
`

export async function loadJobs() {
    try {    
        const { data: { jobs } } = await client.query({ 
            query: loadJobsQuery, 
            fetchPolicy: 'no-cache'
        })

        return jobs
    } catch(err) {
        throw new Error(err)
    }
}


export async function getJob(id) {
    const {data: { job }} = await client.query({ 
        query: getJobQuery, 
        variables: { id }
    })

    return job
}

export async function createJob(input) {
    const { data: {job} } = await client.mutate({
        mutation: createJobMutation,
        variables: { input },
        update: (cache, { data }) => {
            // função realizada após a mutation ser realizada
            // save new data in cache
            cache.writeQuery({
                query: getJobQuery, 
                variables: {id: data.job.id},
                data: data  
            })
        }
        
    })
    return job
}