import React from 'react';
import { Link } from 'react-router-dom';

export const JobList = ({ jobs }) => {
  return (
      <ul className="box">
        {jobs.map(job => (
          <li className="media" key={job.id}>
            <div className="media-content">
              <Link to={`/jobs/${job.id}`}>{job.company ? `${job.title} at ${job.company.name}` : job.title}</Link>
            </div>
          </li>
        ))}
      </ul>
    );
}
