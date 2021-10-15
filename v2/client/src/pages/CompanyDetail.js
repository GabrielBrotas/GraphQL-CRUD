import React from 'react';
import { useParams } from 'react-router-dom';
import { getCompany } from '../services/apiServices/companies.js'
import { JobList } from '../components/JobList.js'

export const CompanyDetail = () => {
  const {companyId} = useParams()
  
  const [company, setCompany] = React.useState()

  React.useEffect(() => {
    getCompany(companyId).then(res => {
        setCompany(res)
    }).catch(err => console.log({err}))
  }, [companyId])

  if(!company) return <></>

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>

      <h5 className="title is-5">Jobs at {company.name}</h5>

      <JobList jobs={company.jobs} />

    
    </div>
  );
}
