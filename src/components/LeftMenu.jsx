import React, { Component } from "react";

class LeftMenu extends Component {
  state = {};
  render() {
    return (
      <nav className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
         <div className="scrollbar-inner">
           {/* <!-- Brand --> */}
           <div className="sidenav-header  align-items-center">
             <a className="navbar-brand" href="javascript:void(0)">
               <img src="assets/img/brand/blue.png" className="navbar-brand-img" alt="..."/> 
             </a>
           </div>
           <div className="navbar-inner">
            {/* <!-- Collapse --> */}
            <div className="collapse navbar-collapse" id="sidenav-collapse-main">
              <div className="accordion" id="menuAccordion">
                {/* <!-- Nav items --> */}
                <ul className="navbar-nav">

                  <li className="nav-item">
                    <a href="dashboard.html" className="list-group-item list-group-item-action flex-column align-items-start active">
                      <div className="d-flex w-100 justify-content-start align-items-center">
                        <i className="fa fa-tv mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">Dashboard</span>
                      </div>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a href="#submenu1" data-toggle="collapse" aria-expanded="false" className="list-group-item list-group-item-action flex-column align-items-start">
                      <div className="d-flex w-100 justify-content-start align-items-center">
                        <i className="fa fa-list-alt mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">Orders</span>
                      </div>
                    </a>
                    {/* <!-- Submenu content --> */}
                    <div id='submenu1' className="collapse sidebar-submenu" data-parent="#menuAccordion">
                      <a href="#" className="list-group-item list-group-item-action">
                        <span className="ml-4 menu-collapsed">Add new order</span>
                      </a>
                      <a href="#" className="list-group-item list-group-item-action">
                        <span className="ml-4 menu-collapsed">View orders</span>
                      </a>
                    </div>
                  </li>

                  <li className="nav-item">
                    <a href="#submenu2" data-toggle="collapse" aria-expanded="false" className="list-group-item list-group-item-action flex-column align-items-start">
                      <div className="d-flex w-100 justify-content-start align-items-center">
                        <i className="fa fa-ship mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">Shipments</span>
                      </div>
                    </a>
                    {/* <!-- Submenu content --> */}
                    <div id='submenu2' className="collapse sidebar-submenu"  data-parent="#menuAccordion">
                      <a href="#" className="list-group-item list-group-item-action">
                        <span className="ml-4 menu-collapsed">Add new shipment</span>
                      </a>
                      <a href="#" className="list-group-item list-group-item-action">
                        <span className="ml-4 menu-collapsed">View shipments</span>
                      </a>
                    </div>
                  </li>
                  
                  <li className="nav-item">
                    <a href="#submenu3" data-toggle="collapse" aria-expanded="false" className="list-group-item list-group-item-action flex-column align-items-start">
                      <div className="d-flex w-100 justify-content-start align-items-center">
                        <i className="fa fa-cube mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">Packages</span>
                      </div>
                    </a>
                    {/* <!-- Submenu content --> */}
                    <div id='submenu3' className="collapse sidebar-submenu"  data-parent="#menuAccordion">
                      <a href="#" className="list-group-item list-group-item-action">
                        <span className="ml-4 menu-collapsed">Add new package</span>
                      </a>
                      <a href="#" className="list-group-item list-group-item-action">
                        <span className="ml-4 menu-collapsed">View packages</span>
                      </a>
                    </div>
                  </li>

                  <li className="nav-item">
                    <a href="#submenu4" data-toggle="collapse" aria-expanded="false" className="list-group-item list-group-item-action flex-column align-items-start">
                      <div className="d-flex w-100 justify-content-start align-items-center">
                        <i className="fa fa-user mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">Customers</span>
                      </div>
                    </a>
                    {/* <!-- Submenu content --> */}
                    <div id='submenu4' className="collapse sidebar-submenu"  data-parent="#menuAccordion">
                      <a href="create_customer.html" className="list-group-item list-group-item-action">
                        <span className="ml-4 menu-collapsed">Add new customer</span>
                      </a>
                      <a href="list_customers.html" className="list-group-item list-group-item-action">
                        <span className="ml-4 menu-collapsed">View customers</span>
                      </a>
                    </div>
                  </li>

                  <li className="nav-item">
                    <a href="#submenu5" data-toggle="collapse" aria-expanded="false" className="list-group-item list-group-item-action flex-column align-items-start">
                      <div className="d-flex w-100 justify-content-start align-items-center">
                        <i className="fa fa-truck mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">Vehicles</span>
                      </div>
                    </a>

                    <div id='submenu5' className="collapse sidebar-submenu"  data-parent="#menuAccordion">
                      <a href="#" className="list-group-item list-group-item-action">
                        <span className="ml-4 menu-collapsed">Add new vehicle</span>
                      </a>
                      <a href="#" className="list-group-item list-group-item-action">
                        <span className="ml-4 menu-collapsed">View vehicles</span>
                      </a>
                    </div>
                  </li>

                  <li className="nav-item">
                    <a href="#submenu6" data-toggle="collapse" aria-expanded="false" className="list-group-item list-group-item-action flex-column align-items-start">
                      <div className="d-flex w-100 justify-content-start align-items-center">
                        <i className="fa fa-users mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">Employees</span>
                      </div>
                    </a>

                    <div id='submenu6' className="collapse sidebar-submenu"  data-parent="#menuAccordion">
                      <a href="#" className="list-group-item list-group-item-action">
                        <span className="ml-4 menu-collapsed">Add new employee</span>
                      </a>
                      <a href="#" className="list-group-item list-group-item-action">
                        <span className="ml-4 menu-collapsed">View employees</span>
                      </a>
                    </div>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default LeftMenu;