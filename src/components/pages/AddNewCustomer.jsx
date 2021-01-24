


import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import axios from "axios";


import {InputDetailsCard} from '../widgets/DetailsElementCard/DetailsElementsCard';
import ErrorModal from '../widgets/ErrorModal';


const api = axios.create({
    baseURL: "http://localhost:8080/customers"
})

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

        
        this.state = {addCustomerErrorModalIsOpen:false, customerAddresses: [], customerDetailsElements:customerDetailsElements}
    }


    async submitCustomerHandler(){
        //TODO submit the customer to backend
        //customer details are in state



        var newCustomer = {
            fisrstName: this.state.customerDetailsElements.find(element=>element.id === "first-name").value,
            lastName: this.state.customerDetailsElements.find(element=>element.id === "last-name").value,
            email: this.state.customerDetailsElements.find(element=>element.id === "email").value,
            phone: this.state.customerDetailsElements.find(element=>element.id === "phone").value,
            addresses: []
        }

        this.state.customerAddresses.forEach(addressElement => {
            const tempAddress = {
                country: addressElement.find(element=>element.id === "country").value,
                state: addressElement.find(element=>element.id === "state").value,
                city: addressElement.find(element=>element.id === "city").value,
                postalCode: addressElement.find(element=>element.id === "postal-code").value,
                address: addressElement.find(element=>element.id === "address").value,
            }
            newCustomer.addresses.push(tempAddress)
        })


        // const requestOptions = {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(newCustomer)
        // };
        // fetch('http://localhost:8080/customer/add-customer', requestOptions)
        //     .then(response => response.json())
        //     .then(data => this.setState({ postId: data.id }));

        const res = await api.put('', newCustomer);
        if((res.status === 200) || (res.status === 200)){
        console.log("Successful put request")
           this.props.history.push(`/customers/view/${res.data}`);
        }else{
            console.log("Unsuccessful put request")
            this.setState({addCustomerErrorModalIsOpen:true})
        }

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


        const closeAddCustomerErrorModal = () => {
            this.setState({addCustomerErrorModalIsOpen:false})
        }



        return( 
            <div className="container-fluid">
                
                {/* Modal to show error in customer insert */}
                <ErrorModal 
                    show={this.state.addCustomerErrorModalIsOpen} 
                    closeHandler={closeAddCustomerErrorModal} 
                    errorTitle="Error" 
                    errorText="An error occured while adding new customer"/>

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
                        <button className="btn btn-primary btn-lg btn-block" onClick={() => this.submitCustomerHandler()}>
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