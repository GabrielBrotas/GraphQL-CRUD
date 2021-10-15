import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { isLoggedIn, logout } from './services/apiServices/auth';
import { CompanyDetail } from './pages/CompanyDetail';
import { LoginForm } from './pages/LoginForm';
import { JobBoard } from './pages/JobBoard';
import { JobDetail } from './pages/JobDetail';
import { JobForm } from './pages/JobForm';
import { NavBar } from './components/NavBar';

export const AppWrapper = () => {
  return (
    <Router> 
      <App />
    </Router>
  )
}

export const App = () => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())
  const history = useHistory();

  function handleLogin() {
    setLoggedIn(true);
    history.push('/');
  }

  function handleLogout() {
    logout();
    setLoggedIn(false);
    history.push('/');
  }

  return (
    <div>
      <NavBar loggedIn={loggedIn} onLogout={handleLogout} />
      <section className="section">
        <div className="container">
          <Switch>
            <Route exact path="/" component={JobBoard} />
            <Route path="/companies/:companyId" component={CompanyDetail} />
            <Route exact path="/jobs/new" component={JobForm} />
            <Route path="/jobs/:jobId" component={JobDetail} />
            <Route exact path="/login" render={() => <LoginForm onLogin={handleLogin} />} />
          </Switch>
        </div>
      </section>
    </div>
  );
}
