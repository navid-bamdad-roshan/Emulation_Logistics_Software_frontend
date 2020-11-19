import React, {Component} from 'react';

class Header extends Component{
    state={};
    render(){
        return(
            <div className="header bg-primary pb-6">
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="row align-items-center py-4">
                            <div className="col-12">
                                <h6 className="h2 text-white d-inline-block mb-0">Default</h6>
                                    <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
                                    <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                        <li className="breadcrumb-item">
                                            <a href="#"><i className="fa fa-lg fa-home"></i></a>
                                        </li>
                                        <li className="breadcrumb-item"><a href="#">Dashboards</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Default</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        {/* This part should be included only in dachboard page */}
                        <div className="row">
                            <div className="col-xl-3 col-md-6">
                                <div className="card card-stats">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <h5 className="card-title text-uppercase text-muted mb-0">
                                                    Orders
                                                </h5>
                                                <span className="h2 font-weight-bold mb-0">40</span>
                                            </div>
                                            <div className="col-auto">
                                                <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                                                    <i className="fa fa-list-alt" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card card-stats">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <h5 className="card-title text-uppercase text-muted mb-0">Shipments</h5>
                                                <span className="h2 font-weight-bold mb-0">20</span>
                                            </div>
                                            <div className="col-auto">
                                                <div className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                                                    <i className="fa fa-ship" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card card-stats">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <h5 className="card-title text-uppercase text-muted mb-0">
                                                    Customers
                                                </h5>
                                                <span className="h2 font-weight-bold mb-0">20</span>
                                            </div>
                                            <div className="col-auto">
                                                <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                                                    <i className="fa fa-user" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card card-stats">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <h5 className="card-title text-uppercase text-muted mb-0">
                                                    Vehicles
                                                </h5>
                                                <span className="h2 font-weight-bold mb-0">10</span>
                                            </div>
                                            <div className="col-auto">
                                                <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                                                    <i className="fa fa-truck" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;