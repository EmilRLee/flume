import {
  Switch,
 BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import Logout from './Logout';
import ServiceScheduler from './ServiceScheduler';


function App() {

  return (
    <Router>
        <Switch>
          <Route path="/home">
            <Main />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/service">
            <ServiceScheduler />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
