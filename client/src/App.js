import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import NavBar from './Navbar';
import SavingPlan from './pages/SavingPlan';
import MyFinance from './pages/MyFinance';
import Categories from './pages/Categories';
import User from './pages/User';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <div className = "content">
          <Switch>
            <Route path="/home">
              <Home/>
            </Route>
            <Route path="/finance">
              <MyFinance/>
            </Route>
            <Route path="/category">
              <Categories/>
            </Route>
            <Route path="/savingPlan">
              <SavingPlan/>
            </Route>
            <Route path="/user">
              <User/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
  
export default App;
