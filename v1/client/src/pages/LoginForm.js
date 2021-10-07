import React from 'react';
import { login } from '../services/apiServices/auth';

export const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(false)

  function handleClick(event) {
    event.preventDefault();
    
    login(email, password).then((ok) => {
      if (ok) {
        onLogin();
      } else {
        setError(true);
      }
    });
  }

  return (
    <form>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input className="input" type="text" name="email" value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input className="input" type="password" name="password" value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <div className="field">
        <p className="help is-danger">{error && 'Invalid credentials'}</p>
        <div className="control">
          <button className="button is-link" onClick={handleClick}>Login</button>
        </div>
      </div>
    </form>
  );
}
