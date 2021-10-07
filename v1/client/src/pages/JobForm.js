import React from 'react';
import { createJob } from '../services/apiServices/jobs';
import { useHistory } from 'react-router-dom';

export const JobForm = () => {
  const [title, setTitle] = React.useState('')  
  const [description, setDescription] = React.useState('')  
  const history = useHistory()

  async function handleClick(event) {
    event.preventDefault();
    const job = await createJob({ 
      title,
      description,
    })

    history.push(`/jobs/${job.id}`)
  }

  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input className="input" type="text" name="title" value={title}
                onChange={(e) => setTitle(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea className="input" style={{height: '10em'}}
                name="description" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleClick}>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
