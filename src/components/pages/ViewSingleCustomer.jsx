import React, {Component} from 'react';

//import {NonEditableDetailsElement, InputDetailsElement} from '../layouts/DetailsElement';

import {EditableDetailsCardWithModal} from '../layouts/DetailsElementsCard';


class ViewSingleCustomer extends Component{






    render(){
        var customerDetailsElements = [{"title":"First Name", "value":"John", "id":"first-name", "colSize":"6", "inputType":"text"},
                                    {"title":"Last Name", "value":"Snow", "id":"last-name", "colSize":"6", "inputType":"text"},
                                    {"title":"Email", "value":"person@people.com", "id":"email", "colSize":"6", "inputType":"email"},
                                    {"title":"Phone", "value":"+987654321", "id":"phone", "colSize":"6", "inputType":"tel"},
                                    {"title":"Customer ID", "value":"c_1234", "id":"id", "colSize":"6", "inputType":"text"},
        ]

        var customerAddressElements = [{"title":"Country", "value":"Estonia", "id":"country", "colSize":"6", "inputType":"text"},
                                    {"title":"State", "value":"Harjumaa", "id":"state", "colSize":"6", "inputType":"text"},
                                    {"title":"City", "value":"Tallinn", "id":"city", "colSize":"6", "inputType":"text"},
                                    {"title":"Postal code", "value":"987654", "id":"postal-code", "colSize":"6", "inputType":"text"},
                                    {"title":"Address", "value":"Address of the customer!", "id":"address", "colSize":"12", "inputType":"text"},
        ]


        return( 
            <div className="container-fluid mt--6">
                <div className="row">
                    <div className="col">
                        {/* Card to show customer details */}
                        <EditableDetailsCardWithModal cardTitle="Customer Details" cardId="customer-details" cardElements={customerDetailsElements} />
                    </div>
                </div>


                <div className="row">
                <div className="col">

                    {/* Card to show customer address */}
                    <EditableDetailsCardWithModal cardTitle="Customer Address" cardId="customer-address" cardElements={customerAddressElements} />


                    {/* <div className="card">
                    <div className="card-header">
                        <div className="row align-items-center">
                        <div className="col-8">
                            <h3 className="mb-0">Customer address</h3>
                        </div>
                        <div className="col-4 text-right">
                            


                            <button type="button" className="btn btn-sm btn-primary" data-toggle="modal" data-target="#modalEditAddress">
                            Edit
                            </button>
                            <button type="button" className="btn btn-sm btn-primary">
                            Delete
                            </button>

                            <div className="modal fade bd-example-modal-lg" id="modalEditAddress" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Edit customer address</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-6">
                                        <div className="form-group">
                                            <label className="form-control-label" for="input-country" style={{"float":"left"}}>Country</label>
                                            <input type="text" id="input-country" className="form-control" placeholder="Country" value=""/>
                                        </div>
                                        </div>
                                        <div className="col-lg-6">
                                        <div className="form-group">
                                            <label className="form-control-label" for="input-state" style={{"float":"left"}}>State</label>
                                            <input type="text" id="input-state" className="form-control" placeholder="State" value=""/>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                        <div className="form-group">
                                            <label className="form-control-label" for="input-city" style={{"float":"left"}}>City</label>
                                            <input type="text" id="input-city" className="form-control" placeholder="City" value=""/>
                                        </div>
                                        </div>
                                        <div className="col-lg-6">
                                        <div className="form-group">
                                            <label className="form-control-label" for="input-postal-code" style={{"float":"left"}}>Postal code</label>
                                            <input type="text" id="input-postal-code" className="form-control" placeholder="Postal code" value=""/>
                                        </div>
                                        </div>
                                        <div className="col-lg-12">
                                        <div className="form-group">
                                            <label className="form-control-label" for="input-address" style={{"float":"left"}}>Address</label>
                                            <input type="text" id="input-address" className="form-control" placeholder="Address"/>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                </div>
                                </div>
                            </div>
                            </div>

                        </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <form>
                        
                        <div className="pl-lg-4">
                           
                            <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                <label className="form-control-label" for="input-country">Country</label>
                                <br/>
                                <span>Estonia</span>
                                
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                <label className="form-control-label" for="input-state">State</label>
                                <br/>
                                <span>Harjumaa</span>
                                
                                </div>
                            </div>
                            </div>
                        </div>
                        
                        <div className="pl-lg-4">
                            
                            <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                <label className="form-control-label" for="input-city">City</label>
                                <br/>
                                <span>Tallinn</span>
                                
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                <label className="form-control-label" for="input-postal-code">Postal code</label>
                                <br/>
                                <span>987654</span>
                                
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                <label className="form-control-label" for="input-address">Address</label>
                                <br/>
                                <span>Address of the customer!</span>
                                </div>
                            </div>
                            </div>
                        </div>

                        </form>
                    </div>
                    </div> */}
                </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center pb-4">
                    
                    <button className="btn">
                        <span><i className="fa fa-plus-circle" aria-hidden="true"></i> Add new address</span>
                    </button>
                    </div>
                </div>
                {/* <!-- <div className="row">
                <div className="col d-flex justify-content-end">
                    <button className="btn btn-primary">
                    Submit
                    </button>
                </div>
                </div> --> */}
                {/* <!-- Footer --> */}
                <footer className="footer pt-0">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-6">
                    <div className="copyright text-center text-lg-left text-muted">
                        &copy; 2020
                        <a
                        href="https://www.creative-tim.com"
                        className="font-weight-bold ml-1"
                        target="_blank"
                        >Creative Tim</a
                        >
                    </div>
                    </div>
                </div>
                </footer>
            </div>
        );
    }
}

export default ViewSingleCustomer;