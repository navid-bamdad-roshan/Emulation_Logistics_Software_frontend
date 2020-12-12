import React, {Component} from 'react'
//import logo from './logo.svg';
//import './App.css';

// Import layouts
import LeftMenu from './components/layouts/LeftMenu';
import Header from './components/layouts/Header';
import SearchBarHeader from './components/layouts/SearchBarHeader';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";



// Import pages
import ViewSingleCustomer from './components/pages/ViewSingleCustomer';
import ViewCustomers from './components/pages/ViewCustomers';
import ViewCustomersOld from './components/pages/ViewCustomersOld';
import Footer from './components/layouts/Footer';
import Dashboard from './components/pages/Dashboard';
import AddNewCustomer from './components/pages/AddNewCustomer';


class App extends Component{

  state = {};
  
  
  render(){
    return(
      <Router>
          <LeftMenu></LeftMenu>
          <div className="main-content" id="panel">
            <SearchBarHeader/>
            <Header/>



            <div className='mt--6'>



              <Switch>
                <Route path="/customers">
                  <CustomersRoute />
                </Route>
                <Route path="/">
                  <Dashboard/>
                </Route>
              </Switch>


              {/* <Dashboard/> */}

              {/* <ViewCustomers/> */}

              {/* <ViewCustomersOld/> */}

              {/* <ViewSingleCustomer/> */}

            </div>
            <Footer/>
          </div>
      </Router>
    );
  }
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

// function Topic() {
//   let { customerId } = useParams();
//   return <h3>Requested topic ID: {customerId}</h3>;
// }










// function CustomersRouter() {
//   let match = useRouteMatch();

//   return (
//       <div>
//         <Switch>
//           <Route path={`${match.path}/:customerId`}>
//             <ViewSingleCustomerRouter />
//           </Route>
//           <Route path={match.path}>
//             <ViewCustomers/>
//           </Route>
//         </Switch>
//       </div>
//   );
// }



// function ViewSingleCustomerRouter() {
//   let { customerId } = useParams();
//   console.log(customerId)
//   return <ViewSingleCustomer customerId={customerId}/>;
// }

export default App;
