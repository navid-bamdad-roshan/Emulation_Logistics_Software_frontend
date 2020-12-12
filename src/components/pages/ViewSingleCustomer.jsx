import React, {Component} from 'react';
import {Link, withRouter, useParams} from "react-router-dom";

import {EditableDetailsCardWithModal} from '../widgets/DetailsElementCard/DetailsElementsCard';


class ViewSingleCustomer extends Component{

    render(){
        var customerDetailsElements = [{"title":"First Name", "value":"John", "id":"first-name", "colSize":"col-lg-6", "inputType":"text"},
                                    {"title":"Last Name", "value":"Snow", "id":"last-name", "colSize":"col-lg-6", "inputType":"text"},
                                    {"title":"Email", "value":"person@people.com", "id":"email", "colSize":"col-lg-6", "inputType":"email"},
                                    {"title":"Phone", "value":"+987654321", "id":"phone", "colSize":"col-lg-6", "inputType":"tel"},
                                    {"title":"Customer ID", "value":"c_1234", "id":"id", "colSize":"col-lg-6", "inputType":"text"},
        ]

        var customerAddressElements = [{"title":"Country", "value":"Estonia", "id":"country", "colSize":"col-lg-6", "inputType":"text"},
                                    {"title":"State", "value":"Harjumaa", "id":"state", "colSize":"col-lg-6", "inputType":"text"},
                                    {"title":"City", "value":"Tallinn", "id":"city", "colSize":"col-lg-6", "inputType":"text"},
                                    {"title":"Postal code", "value":"987654", "id":"postal-code", "colSize":"col-lg-6", "inputType":"text"},
                                    {"title":"Address", "value":"Address of the customer!", "id":"address", "colSize":"col-lg-12", "inputType":"text"},
        ]



        const customerId = this.props.match.params.customerId

        customerDetailsElements[4].value = customerId



        return( 
            <div className="container-fluid">
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
                    
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center pb-4">
                    
                        <button className="btn">
                            <span><i className="fa fa-plus-circle" aria-hidden="true"></i> Add new address</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ViewSingleCustomer);