import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomerPortal from './pages/CustomerPortal';
import VendorDashboard from './pages/VendorDashboard';
import AdminCommandCenter from './pages/AdminCommandCenter';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/customer' component={CustomerPortal} />
        <Route path='/vendor' component={VendorDashboard} />
        <Route path='/admin' component={AdminCommandCenter} />
        <Route path='/' component={CustomerPortal} />
      </Switch>
    </Router>
  );
};

export default App;