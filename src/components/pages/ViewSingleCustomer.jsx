import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import {DetailsCard} from '../widgets/DetailsElementCard/DetailsElementsCard';




class ViewSingleCustomer extends Component{

    constructor(props){
        super(props);



        let customerDetailsElements = [{"title":"First Name", "value":"John", "id":"first-name", "colSize":"col-lg-6", "inputType":"text"},
                                        {"title":"Last Name", "value":"Snow", "id":"last-name", "colSize":"col-lg-6", "inputType":"text"},
                                        {"title":"Email", "value":"person@people.com", "id":"email", "colSize":"col-lg-6", "inputType":"email"},
                                        {"title":"Phone", "value":"+987654321", "id":"phone", "colSize":"col-lg-6", "inputType":"tel"},
                                        {"title":"Customer ID", "value":"c_1234", "id":"id", "colSize":"col-lg-6", "inputType":"text"},
                                    ];

        let customerAddressElements = [{"title":"Country", "value":"Estonia", "id":"country", "colSize":"col-lg-6", "inputType":"text"},
                                        {"title":"State", "value":"Harjumaa", "id":"state", "colSize":"col-lg-6", "inputType":"text"},
                                        {"title":"City", "value":"Tallinn", "id":"city", "colSize":"col-lg-6", "inputType":"text"},
                                        {"title":"Postal code", "value":"987654", "id":"postal-code", "colSize":"col-lg-6", "inputType":"text"},
                                        {"title":"Address", "value":"Address of the customer!", "id":"address", "colSize":"col-lg-12", "inputType":"text"},
                                    ];

        const customerId = this.props.match.params.customerId

        customerDetailsElements[4].value = customerId

        
        this.state = {customerAddresses: [customerAddressElements], customerDetailsElements:customerDetailsElements}
    }


    render(){


        const customerAddressElementsTemplate = [{"title":"Country", "value":"", "id":"country", "colSize":"col-lg-6", "inputType":"text"},
                                                    {"title":"State", "value":"", "id":"state", "colSize":"col-lg-6", "inputType":"text"},
                                                    {"title":"City", "value":"", "id":"city", "colSize":"col-lg-6", "inputType":"text"},
                                                    {"title":"Postal code", "value":"", "id":"postal-code", "colSize":"col-lg-6", "inputType":"text"},
                                                    {"title":"Address", "value":"", "id":"address", "colSize":"col-lg-12", "inputType":"text"},
                                                ];





        const addNewAddressButtonClickHandler = () => {
            var newAddress = customerAddressElementsTemplate
            newAddress.key = this.state.customerAddresses.length
            this.setState({customerAddresses:[...this.state.customerAddresses, newAddress]})
        }

        const deleteAddressHandler = (index) => {
            var tempCustomerAddresses = this.state.customerAddresses
            tempCustomerAddresses.splice(index, 1)
            this.setState({customerAddresses: tempCustomerAddresses})
        }

        const editCustomerDetailsHandler = (editedCustomerDetails) => {
            this.setState({customerDetailsElements:editedCustomerDetails})
            //TODO edit customer in backend
        }

        const editAddressHandler = (index, editedAddress) => {
            let tempAddresses = this.state.customerAddresses
            tempAddresses[index] = editedAddress
            this.setState({customerAddresses:tempAddresses})
            //TODO edit address in backend
        }





        return( 
            <div className="container-fluid">

                <div className="row">
                    <div className="col">
                        {/* Card to show customer details */}
                        <DetailsCard editable={true} onCardEdit={editCustomerDetailsHandler} cardTitle="Customer Details" cardId="customer-details" cardElements={this.state.customerDetailsElements} />
                    </div>
                </div>


                {this.state.customerAddresses.map((addressElements, index) => (
                    <div key={index.toString()} className="row">
                        <div className="col">
                            {/* Card to show customer address */}
                            {/* if needInput is true means new address is created and it needs to ask user for inputs */}
                            <DetailsCard id={index} editable={true} deletable={true} initNeeded={addressElements[0].value===""} onCardDelete={deleteAddressHandler} onCardEdit={editAddressHandler} cardTitle="Customer Address" cardId={"customer-address-"+index} cardElements={addressElements} />
                        </div>
                    </div>
                ))}
                
                


                <div className="row">
                    <div className="col-12 d-flex justify-content-center pb-4">
                        <button className="btn" onClick={() => addNewAddressButtonClickHandler()}>
                            <span><i className="fa fa-plus-circle" aria-hidden="true"></i> Add new address</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ViewSingleCustomer);