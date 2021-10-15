import db from '../db.js'

const Query = {
    jobs: () => db.jobs.list(),
    job: (root, args) =>  db.jobs.get(args.id),
    company: (root, args) =>  db.companies.get(args.id)
}

const Mutation = {
    createJob: (root, { input }, context) => {
        if(!context.user) {
            throw new Error("unauthorized")
        }

        const { companyId } = db.users.get(context.user)
        
        const id = db.jobs.create({...input, companyId})
        
        return db.jobs.get(id)
    }
}

const Job = {
    company: (job) => db.companies.get(job.companyId) 
}

const Company = {
    jobs: (company) => db.jobs.list()
        .filter(job => job.companyId === company.id)
}

export default {
    Query,
    Job,
    Company,
    Mutation
}