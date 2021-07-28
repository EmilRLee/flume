import {
  Switch,
 BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import Logout from './Logout';


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
        </Switch>
    </Router>
  );
}

export default App;
