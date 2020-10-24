import {BrowserRouter as Router, Route} from 'react-router-dom'
import ClienDetail from "./ClientDetail"
import Login from "./SignIn"
import Signup from "./SignUp"
import { AuthProvider } from "./Auth.js";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <AuthProvider>
    <Router>
      <div>
        <PrivateRoute exact path="/" component={ClienDetail}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
