import React, {Component} from 'react'
//import logo from './logo.svg';
//import './App.css';

// Import layouts
import LeftMenu from './components/layouts/LeftMenu';
import Header from './components/layouts/Header';
import SearchBarHeader from './components/layouts/SearchBarHeader';



// Import pages
import ViewSingleCustomer from './components/pages/ViewSingleCustomer';
import ViewCustomers from './components/pages/ViewCustomers';
import Footer from './components/layouts/Footer';
import Dashboard from './components/pages/Dashboard';


class App extends Component{

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render(){
    return(
      <React.Fragment>
        <LeftMenu></LeftMenu>
        <div class="main-content" id="panel">
          <SearchBarHeader/>
          <Header/>
          
          <div className='mt--6'>

            {/* <Dashboard/> */}

            <ViewCustomers/>

            {/* <ViewSingleCustomer/> */}

          </div>


            

          <Footer/>
        </div>
      
      </React.Fragment>
    );
  }
}

export default App;
