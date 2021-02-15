import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import axios from "axios";

import {DetailsCard} from '../widgets/DetailsElementCard/DetailsElementsCard';

import ErrorModal from '../widgets/ErrorModal';
import MainCard from '../widgets/MainCard';


const api = axios.create({
    baseURL: "http://localhost:8080/customers"
})




class ViewSingleCustomer extends Component{

    constructor(props){
        super(props);



        this.customerDetailsElementsTemplate = [{"title":"First Name", "value":"", "id":"first-name", "colSize":"col-lg-6", "inputType":"text", "requiredField":true},
                                        {"title":"Last Name", "value":"", "id":"last-name", "colSize":"col-lg-6", "inputType":"text", "requiredField":true},
                                        {"title":"Email", "value":"", "id":"email", "colSize":"col-lg-6", "inputType":"email", "requiredField":false},
                                        {"title":"Phone", "value":"", "id":"phone", "colSize":"col-lg-6", "inputType":"tel", "requiredField":false},
                                        {"title":"Customer ID", "value":"", "id":"id", "colSize":"col-lg-6", "inputType":"text"},
                                    ];

        this.customerAddressElementsTemplate = [{"title":"Country", "value":"", "id":"country", "colSize":"col-lg-6", "inputType":"text", "requiredField":true},
                                        {"title":"State", "value":"", "id":"state", "colSize":"col-lg-6", "inputType":"text", "requiredField":false},
                                        {"title":"City", "value":"", "id":"city", "colSize":"col-lg-6", "inputType":"text", "requiredField":true},
                                        {"title":"Postal code", "value":"", "id":"postal-code", "colSize":"col-lg-6", "inputType":"text", "requiredField":true},
                                        {"title":"Address", "value":"", "id":"address", "colSize":"col-lg-12", "inputType":"text", "requiredField":true},
                                    ];

        
        
        // customerDetailsElements[4].value = customerId
        
        
        this.state = {
            customerAddresses: [],
            customerDetailsElements:this.customerDetailsElementsTemplate,
            selectedCustomerId: this.props.match.params.customerId,
            loadCustomerErrorModalIsOpen:false,
            loadingData:false,
        };
    }





    componentDidMount(){
        
        this.loadCustomer()
    }

    async loadCustomer(){
        try{
            this.setState({loadingData:true})
            const res = await api.get(`/${this.state.selectedCustomerId}`);
            if(res.status === 200){
                
                let [tmpCustomer, tmpAddresses] = this.loadCustomerToDetailElements(res.data)

                this.setState({loadingData:false, customerDetailsElements:tmpCustomer, customerAddresses:tmpAddresses})
            }else{
                this.setState({loadCustomerErrorModalIsOpen:true, loadingData:false})
            }
        }catch{
            this.setState({loadCustomerErrorModalIsOpen:true, loadingData:false})

        }
    }


    loadCustomerToDetailElements(loadedCustomer){
        let customer = [...this.customerDetailsElementsTemplate]
        let addresses = []
        //firstNameIndex = customer.find(element => element.title === "First Name");
        customer.map(element => {
            
            switch(element.id){
                case "first-name":
                    element.value = loadedCustomer.firstName
                break;
                case "last-name":
                    element.value = loadedCustomer.lastName
                break;
                case "email":
                    element.value = loadedCustomer.email
                break;
                case "phone":
                    element.value = loadedCustomer.phone
                break;
                case "id":
                    element.value = loadedCustomer.id
                break;
                default:
                break;
            }
            return element
        })
        addresses = this.loadAddressToDetailElements(loadedCustomer.addresses)
        return ([customer, addresses]);
    }


    loadAddressToDetailElements(loadedAddresses){
        
        let addresses = []
        loadedAddresses.forEach(loadedAddress => {
            var tmpAddress = [...this.customerAddressElementsTemplate]
            
            tmpAddress.map(element => {
                
                switch(element.id){
                    case "country":
                        element.value = loadedAddress.country
                    break;
                    case "state":
                        element.value = loadedAddress.state
                    break;
                    case "city":
                        element.value = loadedAddress.city
                    break;
                    case "postal-code":
                        element.value = loadedAddress.postalCode
                    break;
                    case "address":
                        element.value = loadedAddress.address
                    break;
                    default:
                    break;
                }
                return element
            })
            addresses.push(tmpAddress)
        });
        return (addresses);
    }



    render(){


        // const customerAddressElementsTemplate = [{"title":"Country", "value":"", "id":"country", "colSize":"col-lg-6", "inputType":"text", "requiredField":true},
        //                                             {"title":"State", "value":"", "id":"state", "colSize":"col-lg-6", "inputType":"text", "requiredField":false},
        //                                             {"title":"City", "value":"", "id":"city", "colSize":"col-lg-6", "inputType":"text", "requiredField":true},
        //                                             {"title":"Postal code", "value":"", "id":"postal-code", "colSize":"col-lg-6", "inputType":"text", "requiredField":true},
        //                                             {"title":"Address", "value":"", "id":"address", "colSize":"col-lg-12", "inputType":"text", "requiredField":true},
        //                                         ];





        const addNewAddressButtonClickHandler = () => {
            var newAddress = this.customerAddressElementsTemplate
            newAddress.key = this.state.customerAddresses.length
            this.setState({customerAddresses:[...this.state.customerAddresses, newAddress]})
        }

        const deleteAddressHandler = (index) => {
            var tempCustomerAddresses = this.state.customerAddresses
            tempCustomerAddresses.splice(index, 1)
            this.setState({customerAddresses: [...tempCustomerAddresses]})
        }

        const editCustomerDetailsHandler = (editedCustomerDetails) => {
            this.setState({customerDetailsElements: [...editedCustomerDetails]})
            //TODO edit customer in backend
        }

        const editAddressHandler = (index, editedAddress) => {
            let tempAddresses = this.state.customerAddresses
            tempAddresses[index] = editedAddress
            this.setState({customerAddresses: [...tempAddresses]})
            //TODO edit address in backend
        }


        const errorModalCloseHandler = () => {
            this.props.history.push("/")
        }

        const errorModalRetryHandler = () => {
            this.setState({loadCustomerErrorModalIsOpen:false})
            this.loadCustomer()
        }

  


        return( 
            <div className="container-fluid">
                <ErrorModal 
                    show={this.state.loadCustomerErrorModalIsOpen} 
                    closeHandler={errorModalCloseHandler}
                    retryHandler={errorModalRetryHandler}
                    closeButtonTitle="Homepage"
                    retryButtonTitle="Retry"
                    errorTitle="Error"
                    errorText={"An error occured while loading customers!"}
                />

                {this.state.loadingData && <MainCard cardTitle={"Loading Data!"}><h3> Please wait! </h3></MainCard>}


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