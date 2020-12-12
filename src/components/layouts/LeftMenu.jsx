import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";



class LeftMenu extends Component {
  // {
  //   ordersSubmenuShow: false,
  //   shipmentsSubmenuShow: false,
  //   packagesSubmenuShow: false,
  //   customersSubmenuShow: false,
  //   vehiclesSubmenuShow: false,
  //   employeesSubmenuShow: false
  // }


  state = {
    visibleSubMenu: "",
    selectedMenu: "dashboard"
  };

  setSelectedMenu = (menuName) => {
    //var selectedMenu = this.state.selectedMenu
    //if (selectedMenu === menuName){
    console.log("set state")
    this.setState({selectedMenu:menuName})
    //}else{
    //  this.setState({visibleSubMenu:subMenuName})
    //}
  }

  toggleSubmenu = (subMenuName) => {
    var visibleSubMenu = this.state.visibleSubMenu
    var newVisibleSubMenu = ""
    if (visibleSubMenu === subMenuName){
      newVisibleSubMenu = ""
    }else{
      newVisibleSubMenu = subMenuName
    }
    this.setState({visibleSubMenu:newVisibleSubMenu, selectedMenu:subMenuName})
  };

  getClassName = (subMenuName) => {
    if (this.state.visibleSubMenu === subMenuName){
      return "show"
    }else{
      return ""
    }
  };



  isMenuActive = (MenuName) => {
    if (this.state.selectedMenu === MenuName){
      return "active"
    }else{
      return ""
    }
  };

  // ordersSubmenuShow: false,
  // shipmentsSubmenuShow: false,
  // packagesSubmenuShow: false,
  // customersSubmenuShow: false,
  // vehiclesSubmenuShow: false,
  // employeesSubmenuShow: false


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
                    {/* <a href="" className="list-group-item list-group-item-action flex-column align-items-start active"> */}
                    <Link to="/" onClick={()=>{this.toggleSubmenu("dashboard")}} className={"list-group-item list-group-item-action flex-column align-items-start " + this.isMenuActive("dashboard")}>
                      <div className="d-flex w-100 justify-content-start align-items-center">
                        <i className="fa fa-tv mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">Dashboard</span>
                      </div>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link onClick={()=>{this.toggleSubmenu("orders")}} data-toggle="collapse" aria-expanded="false" className={"list-group-item list-group-item-action flex-column align-items-start " + this.isMenuActive("orders")} >
                      <div className="d-flex w-100 justify-content-start align-items-center">
                        <i className="fa fa-list-alt mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsSed">Orders</span>
                      </div>
                    </Link>
                    {/* <!-- Submenu content --> */}
                    <div id='submenu1' className={"collapse " + this.getClassName("orders") + " sidebar-submenu"} data-parent="#menuAccordion">
                      <Link to="/orders/new" className="list-group-item list-group-item-action">
                        <i class="ml-4 fa fa-arrow-right mr-3" aria-hidden="true"></i>
                        <span className=" menu-collapsed">Add new order</span>
                      </Link>
                      <Link to="/orders" className="list-group-item list-group-item-action">
                        <i class="ml-4 fa fa-arrow-right mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">View orders</span>
                      </Link>
                    </div>
                  </li>

                  <li className="nav-item">
                    <Link onClick={()=>{this.toggleSubmenu("shipments")}} data-toggle="collapse" aria-expanded="false" className={"list-group-item list-group-item-action flex-column align-items-start " + this.isMenuActive("shipments")}>
                      <div className="d-flex w-100 justify-content-start align-items-center">
                        <i className="fa fa-ship mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">Shipments</span>
                      </div>
                    </Link>
                    {/* <!-- Submenu content --> */}
                    <div id='submenu2' className={"collapse " + this.getClassName("shipments") + " sidebar-submenu"}  data-parent="#menuAccordion">
                      <a href="#" className="list-group-item list-group-item-action">
                        <i class="ml-4 fa fa-arrow-right mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">Add new shipment</span>
                      </a>
                      <a href="#" className="list-group-item list-group-item-action">
                        <i class="ml-4 fa fa-arrow-right mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">View shipments</span>
                      </a>
                    </div>
                  </li>
                  
                  <li className="nav-item">
                    <Link onClick={()=>{this.toggleSubmenu("packages")}} data-toggle="collapse" aria-expanded="false" className={"list-group-item list-group-item-action flex-column align-items-start " + this.isMenuActive("packages")}>
                      <div className="d-flex w-100 justify-content-start align-items-center">
                        <i className="fa fa-cube mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">Packages</span>
                      </div>
                    </Link>
                    {/* <!-- Submenu content --> */}
                    <div id='submenu3' className={"collapse " + this.getClassName("packages") + " sidebar-submenu"}  data-parent="#menuAccordion">
                      <a href="#" className="list-group-item list-group-item-action">
                        <i class="ml-4 fa fa-arrow-right mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">Add new package</span>
                      </a>
                      <a href="#" className="list-group-item list-group-item-action">
                        <i class="ml-4 fa fa-arrow-right mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">View packages</span>
                      </a>
                    </div>
                  </li>

                  <li className="nav-item">
                    <Link onClick={()=>{this.toggleSubmenu("customaers")}} data-toggle="collapse" aria-expanded="false" className={"list-group-item list-group-item-action flex-column align-items-start " + this.isMenuActive("customaers")}>
                      <div className="d-flex w-100 justify-content-start align-items-center">
                        <i className="fa fa-user mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">Customers</span>
                      </div>
                    </Link>
                    {/* <!-- Submenu content --> */}
                    <div id='submenu4' className={"collapse " + this.getClassName("customaers") + " sidebar-submenu"}  data-parent="#menuAccordion">
                      <Link to="/customers/new" className="list-group-item list-group-item-action">
                        <i class="ml-4 fa fa-arrow-right mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">Add new customer</span>
                      </Link>
                      <Link to="/customers" className="list-group-item list-group-item-action">
                        <i class="ml-4 fa fa-arrow-right mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">View customers</span>
                      </Link>
                    </div>
                  </li>

                  <li className="nav-item">
                    <Link onClick={()=>{this.toggleSubmenu("vehicles")}} data-toggle="collapse" aria-expanded="false" className={"list-group-item list-group-item-action flex-column align-items-start "+ this.isMenuActive("vehicles")}>
                      <div className="d-flex w-100 justify-content-start align-items-center">
                        <i className="fa fa-truck mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">Vehicles</span>
                      </div>
                    </Link>

                    <div id='submenu5' className={"collapse " + this.getClassName("vehicles") + " sidebar-submenu"}  data-parent="#menuAccordion">
                      <a href="#" className="list-group-item list-group-item-action">
                        <i class="ml-4 fa fa-arrow-right mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">Add new vehicle</span>
                      </a>
                      <a href="#" className="list-group-item list-group-item-action">
                        <i class="ml-4 fa fa-arrow-right mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">View vehicles</span>
                      </a>
                    </div>
                  </li>

                  <li className="nav-item">
                    <Link onClick={()=>{this.toggleSubmenu("employees")}} data-toggle="collapse" aria-expanded="false" className={"list-group-item list-group-item-action flex-column align-items-start " + this.isMenuActive("employees")}>
                      <div className="d-flex w-100 justify-content-start align-items-center">
                        <i className="fa fa-users mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">Employees</span>
                      </div>
                    </Link>

                    <div id='submenu6' className={"collapse " + this.getClassName("employees") + " sidebar-submenu"}  data-parent="#menuAccordion">
                      <a href="#" className="list-group-item list-group-item-action">
                        <i class="ml-4 fa fa-arrow-right mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">Add new employee</span>
                      </a>
                      <a href="#" className="list-group-item list-group-item-action">
                        <i class="ml-4 fa fa-arrow-right mr-3" aria-hidden="true"></i>
                        <span className="menu-collapsed">View employees</span>
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