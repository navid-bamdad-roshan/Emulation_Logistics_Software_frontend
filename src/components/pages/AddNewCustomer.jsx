


import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import {InputDetailsCard} from '../widgets/DetailsElementCard/DetailsElementsCard';


class AddNewCustomer extends Component{




    constructor(props){
        super(props);



        let customerDetailsElements = [{"title":"First Name", "value":"", "id":"first-name", "colSize":"col-lg-6", "inputType":"text"},
                                        {"title":"Last Name", "value":"", "id":"last-name", "colSize":"col-lg-6", "inputType":"text"},
                                        {"title":"Email", "value":"", "id":"email", "colSize":"col-lg-6", "inputType":"email"},
                                        {"title":"Phone", "value":"", "id":"phone", "colSize":"col-lg-6", "inputType":"tel"},
                                    ];

        // let customerAddressElements = [{"title":"Country", "value":"", "id":"country", "colSize":"col-lg-6", "inputType":"text"},
        //                                 {"title":"State", "value":"", "id":"state", "colSize":"col-lg-6", "inputType":"text"},
        //                                 {"title":"City", "value":"", "id":"city", "colSize":"col-lg-6", "inputType":"text"},
        //                                 {"title":"Postal code", "value":"", "id":"postal-code", "colSize":"col-lg-6", "inputType":"text"},
        //                                 {"title":"Address", "value":"", "id":"address", "colSize":"col-lg-12", "inputType":"text"},
        //                             ];

        
        this.state = {customerAddresses: [], customerDetailsElements:customerDetailsElements}
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
            this.setState({customerAddresses: [...tempCustomerAddresses]})
        }

        const submitCustomerHandler = () => {
            //TODO submit the customer to backend
            //customer details are in state
        }

        const customerDetailsInputValueChangeHandler = (elementId, newValue) => {
            let tempCustomerDetailsElements = this.state.customerDetailsElements
            let tempIndex = tempCustomerDetailsElements.findIndex(element => element.id === elementId)
            tempCustomerDetailsElements[tempIndex].value = newValue
            this.setState({customerDetailsElements : [...tempCustomerDetailsElements]})
        }

        const addressDetailsInputValueChangeHandler = (addressIndex, elementId, newValue) => {
            let tempcustomerAddresses = this.state.customerAddresses
            let tempIndex = tempcustomerAddresses[addressIndex].findIndex(element => element.id === elementId)
            tempcustomerAddresses[addressIndex][tempIndex].value = newValue
            this.setState({customerAddresses : [...tempcustomerAddresses]})
        }





        return( 
            <div className="container-fluid">

                <div className="row">
                    <div className="col">
                        {/* Card to show customer details */}
                        <InputDetailsCard onCardInputValueChange={customerDetailsInputValueChangeHandler} cardTitle="Customer Details" cardId="customer-details" cardElements={this.state.customerDetailsElements} />
                    </div>
                </div>


                {this.state.customerAddresses.map((addressElements, index) => (
                    <div key={index.toString()} className="row">
                        <div className="col">
                            {/* Card to show customer address */}
                            {/* if needInput is true means new address is created and it needs to ask user for inputs */}
                            <InputDetailsCard id={index} onCardInputValueChange={addressDetailsInputValueChangeHandler} deletable={true} onCardDelete={deleteAddressHandler} cardTitle="Customer Address" cardId={"customer-address-"+index} cardElements={addressElements} />
                        </div>
                    </div>
                ))}
                
                


                <div className="row">
                    <div className="col-12 d-flex justify-content-center pb-4">
                        <button className="btn" onClick={() => addNewAddressButtonClickHandler()}>
                            <span><i className="fa fa-plus-circle" aria-hidden="true"></i> Add address</span>
                        </button>
                    </div>
                </div>

                <br/>
                <br/>

                <div className="row">
                    <div className="col-4">

                    </div>
                    <div className="col-4 d-flex justify-content-center pb-4">
                        <button className="btn btn-primary btn-lg btn-block" onClick={() => submitCustomerHandler()}>
                            <span>Submit</span>
                        </button>
                    </div>
                    <div className="col-4">

                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AddNewCustomer);