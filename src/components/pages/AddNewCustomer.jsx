


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

        let customerDetailsElements = [{"title":"First Name", "value":"", "id":"first-name", "colSize":"col-lg-6", "inputType":"text", "requiredField":true},
                                        {"title":"Last Name", "value":"", "id":"last-name", "colSize":"col-lg-6", "inputType":"text", "requiredField":true},
                                        {"title":"Email", "value":"", "id":"email", "colSize":"col-lg-6", "inputType":"email", "requiredField":false},
                                        {"title":"Phone", "value":"", "id":"phone", "colSize":"col-lg-6", "inputType":"tel", "requiredField":false},
                                    ];

        
        this.state = {addCustomerErrorModalIsOpen:false, customerAddresses: [], customerDetailsElements:customerDetailsElements}
    }


    

 
    // extract the info of new customer and its addresses from the customerDetailsElement and customerAddresses
    // send an api request to create a new customer in database
    async submitCustomerHandler(){
        //customer details are in state

        var error = "";
        
        var newCustomer = {
            firstName: this.state.customerDetailsElements.find(element=>element.id === "first-name").value,
            lastName: this.state.customerDetailsElements.find(element=>element.id === "last-name").value,
            email: this.state.customerDetailsElements.find(element=>element.id === "email").value,
            phone: this.state.customerDetailsElements.find(element=>element.id === "phone").value,
            addresses: []
        }

        if(newCustomer.firstName === "" || newCustomer.lastName === ""){
            error = "Please fill the required fields!"
        }

        this.state.customerAddresses.forEach(addressElement => {
            const tempAddress = {
                country: addressElement.find(element=>element.id === "country").value,
                state: addressElement.find(element=>element.id === "state").value,
                city: addressElement.find(element=>element.id === "city").value,
                postalCode: addressElement.find(element=>element.id === "postal-code").value,
                address: addressElement.find(element=>element.id === "address").value,
            }
            if(tempAddress.country === "" || tempAddress.city === "" || tempAddress.postalCode === "" || tempAddress.address === ""){
                error = "Please fill the required fields!"
            }
            newCustomer.addresses.push(tempAddress)
        })


        if (error === ""){
            try{
                const res = await api.post('', newCustomer);
                if((res.status === 200) && (res.data !== -1)){
                console.log("Successful put request")
                   this.props.history.push(`/customers/view/${res.data}`);
                }else{
                    console.log("Unsuccessful put request")
                    this.addCustomerErrorMessage = "An error occured while adding new customer!"
                    this.setState({addCustomerErrorModalIsOpen:true})
                }
            }catch{
                console.log("Unsuccessful put request")
                this.addCustomerErrorMessage = "An error occured while adding new customer!"
                this.setState({addCustomerErrorModalIsOpen:true})
            }

        }else{
            this.addCustomerErrorMessage = error
            this.setState({addCustomerErrorModalIsOpen:true})
        }



    }


    render(){

        const customerAddressElementsTemplate = [{"title":"Country", "value":"", "id":"country", "colSize":"col-lg-6", "inputType":"text", "requiredField":true},
                                                    {"title":"State", "value":"", "id":"state", "colSize":"col-lg-6", "inputType":"text", "requiredField":false},
                                                    {"title":"City", "value":"", "id":"city", "colSize":"col-lg-6", "inputType":"text", "requiredField":true},
                                                    {"title":"Postal code", "value":"", "id":"postal-code", "colSize":"col-lg-6", "inputType":"text", "requiredField":true},
                                                    {"title":"Address", "value":"", "id":"address", "colSize":"col-lg-12", "inputType":"text", "requiredField":true},
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
            this.addCustomerErrorMessage=""
            this.setState({addCustomerErrorModalIsOpen:false})
        }



        return( 
            <div className="container-fluid">
                
                {/* Modal to show error in customer insert */}
                <ErrorModal 
                    show={this.state.addCustomerErrorModalIsOpen} 
                    closeHandler={closeAddCustomerErrorModal} 
                    errorTitle="Error" 
                    errorText={this.addCustomerErrorMessage}/>

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