import React, {Component} from 'react'
//import logo from './logo.svg';
//import './App.css';

import { Provider } from 'react-redux';
import store from './redux/store';



// Import layouts
import LeftMenu from './components/layouts/LeftMenu';
import Header from './components/layouts/Header';
import SearchBarHeader from './components/layouts/SearchBarHeader';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams
} from "react-router-dom";



// Import pages
import ViewSingleCustomer from './components/pages/ViewSingleCustomer';
import ViewCustomers from './components/pages/ViewCustomers';
//import ViewCustomersOld from './components/pages/ViewCustomersOld';
import Footer from './components/layouts/Footer';
import Dashboard from './components/pages/Dashboard';
import AddNewCustomer from './components/pages/AddNewCustomer';
import Login from './components/pages/Login';






class App extends Component{

  state = {};
  
  render(){

    return(
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/">
              <LeftMenu></LeftMenu>
              <div className="main-content" id="panel">
                <SearchBarHeader/>
                <Header/>
                <div className='mt--6'>
                  <MenuRoutes/>
                </div>
                <Footer/>
              </div>
            </Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}



function MenuRoutes() {

  return (
    <div>

      {/* <Link to='/customers/new'>/customers/new</Link>
      <br/>
      <Link to='/customers/view/gggggg'>/customers/view/gggggg</Link>
      <br/>
      <Link to='/customers'>/customers</Link>
      <br/> */}

      <Switch>
        <Route path="/customers">
          <CustomersRoute />
        </Route>
        <Route exact path="/">
          <Dashboard/>
        </Route>
        <Route path="/">
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <h1>  TODO implement 404 Not Found </h1>
        </Route>
      </Switch>
    </div>
  );
}




function CustomersRoute() {
  let match = useRouteMatch();

  return (
    <div>

      {/* <Link to='/customers/new'>/customers/new</Link>
      <br/>
      <Link to='/customers/view/gggggg'>/customers/view/gggggg</Link>
      <br/>
      <Link to='/customers'>/customers</Link>
      <br/> */}

      <Switch>
      <Route path={`${match.path}/new`}>
          <AddNewCustomer/>
        </Route>
        <Route path={`${match.path}/view/:customerId`}>
          <ViewSingleCustomer customerId={useParams().customerId}/>
        </Route>
        <Route path={match.path}>
          <ViewCustomers/>
        </Route>
      </Switch>
    </div>
  );
}


export default App;
