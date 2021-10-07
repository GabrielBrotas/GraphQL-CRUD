import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getJob } from '../services/apiServices/jobs'

export const JobDetail = () => {
  const { jobId } = useParams()
  const [job, setJob] = React.useState()

  React.useEffect(() => {
    getJob(jobId).then(res => {
        setJob(res)
    }).catch(err => console.log({err}))
  }, [jobId])

  return (
    <div>
      <h1 className="title">{job?.title}</h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job?.company.id}`}>{job?.company.name}</Link>
      </h2>
      <div className="box">{job?.description}</div>
    </div>
  );
}
