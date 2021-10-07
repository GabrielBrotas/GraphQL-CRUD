import React, { useState } from 'react';
import { JobList } from '../components/JobList';
import { loadJobs } from '../services/apiServices/jobs'

export const JobBoard = () => {
  const [jobs, setJobs] = useState([])

  React.useEffect(() => {
    loadJobs().then(res => {
        setJobs(res)
    }).catch(err => console.log({err}))
  }, [])

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}
