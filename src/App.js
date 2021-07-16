import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import "./main.scss";
import { Provider } from "react-redux";
import Store from "./store";
import Navbar from "./components/Navbar"
import Home from "./components/Home";
import register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard"
import PrivateRoute from "./Private/PrivateRoute";
import RouteLinks from "./Private/RouteLinks";
import NotFound from "./components/NotFound";
import Create from "./components/Create";
import Edit from "./components/Edit";
import EditImage from "./components/Editimage";
import UpdateName from "./components/UpdateName";
import ChangePassword from "./components/ChangePassword";
import Details from "./components/Details";
function App() {
  return (
    <Provider store={Store}>
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/details/:id" exact component={Details}/>
        <Route path="/home/:page" exact component={Home}/>
        <RouteLinks path="/register" exact component={register} />
        <RouteLinks path="/Login" exact component={Login} />
        <PrivateRoute path="/dashboard/:page?" exact component={Dashboard} />  
        <PrivateRoute path="/create" exact component={Create}/>
        <PrivateRoute path="/edit/:id" exact component={Edit}/>
        <PrivateRoute path="/updateImage/:id" exact component={EditImage}/>
        <PrivateRoute path="/updateName" exact component={UpdateName}/>
        <PrivateRoute path="/updatePassword" exact component={ChangePassword}/>
        <Route component={NotFound}/>
      </Switch>
     
 </Router>
 </Provider>
  );
}

export default App;
