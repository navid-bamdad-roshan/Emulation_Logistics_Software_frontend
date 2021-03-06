import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import axios from "axios";
import {DetailsCard} from '../widgets/DetailsElementCard/DetailsElementsCard';
import ErrorModal from '../widgets/ErrorModal';
import BlockingModal from '../widgets/BlockingModal';

const lodashClonedeep = require("lodash.clonedeep");



const customerAddressElementsTemplate = [
                                            {"title":"Country", "addressId":"", "value":"", "id":"country", "colSize":"col-lg-6", "inputType":"text", "requiredField":true},
                                            {"title":"State", "addressId":"", "value":"", "id":"state", "colSize":"col-lg-6", "inputType":"text", "requiredField":false},
                                            {"title":"City", "addressId":"", "value":"", "id":"city", "colSize":"col-lg-6", "inputType":"text", "requiredField":true},
                                            {"title":"Postal code", "addressId":"", "value":"", "id":"postal-code", "colSize":"col-lg-6", "inputType":"text", "requiredField":true},
                                            {"title":"Address", "addressId":"", "value":"", "id":"address", "colSize":"col-lg-12", "inputType":"text", "requiredField":true},
                                        ];


const customerDetailsElementsTemplate = [
                                            {"title":"First Name", "value":"", "id":"first-name", "colSize":"col-lg-6", "inputType":"text", "requiredField":true},
                                            {"title":"Last Name", "value":"", "id":"last-name", "colSize":"col-lg-6", "inputType":"text", "requiredField":true},
                                            {"title":"Email", "value":"", "id":"email", "colSize":"col-lg-6", "inputType":"email", "requiredField":false},
                                            {"title":"Phone", "value":"", "id":"phone", "colSize":"col-lg-6", "inputType":"tel", "requiredField":false},
                                            {"title":"Customer ID", "value":"", "id":"id", "colSize":"col-lg-6", "inputType":"text"},
                                        ];


class ViewSingleCustomer extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            customerAddresses: [],
            customerDetailsElements:customerDetailsElementsTemplate,
            selectedCustomerId: this.props.match.params.customerId,
            loadCustomerErrorModalIsOpen:false,
            deleteCustomerErrorModalIsOpen:false,
            deleteAddressErrorModalIsOpen:false,
            loadingData:false,
            deleting:false,
            addressIndexToDelete:-1,
            blockingModalMessage:"",
            customerDetailsEditModalMessage:"",
            customerAddressEditModalMessage:"",
            newlyAddedAddressIndex:-1
        };
    }

    componentDidMount(){
        
        this.loadCustomer()
    }

    // API request to get the customer
    async loadCustomer(){
        try{
            this.setState({loadingData:true})
            let headers= {
                'Authorization': `Bearer ${this.props.user.jwtToken.jwt}`,
                'Content-Type': 'application/json',
            }


            const api = axios.create({
                baseURL: "http://localhost:8080/customers",
                headers: headers
            })

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

    // load json string customer to customerDetailsElementsTemplate 
    loadCustomerToDetailElements(loadedCustomer){
        let customer = lodashClonedeep(customerDetailsElementsTemplate)
        let addresses = []
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

    // load json string customer addresses to customerAddressElementsTemplate
    loadAddressToDetailElements(loadedAddresses){
        let addresses = []
        loadedAddresses.forEach(loadedAddress => {
            var tmpAddress = lodashClonedeep(customerAddressElementsTemplate)
            tmpAddress.map(element => {
                switch(element.id){
                    case "country":
                        element.value = loadedAddress.country
                        element.addressId = loadedAddress.id
                    break;
                    case "state":
                        element.value = loadedAddress.state
                        element.addressId = loadedAddress.id
                    break;
                    case "city":
                        element.value = loadedAddress.city
                        element.addressId = loadedAddress.id
                    break;
                    case "postal-code":
                        element.value = loadedAddress.postalCode
                        element.addressId = loadedAddress.id
                    break;
                    case "address":
                        element.value = loadedAddress.address
                        element.addressId = loadedAddress.id
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


    // Input: editted customer details 
    //      update the customerDetailsElement in state
    //      send an api request to update the customer in database
    async updateCustomer(editedCustomerDetails){
        var error = "";

        var editedCustomer = {
            firstName: editedCustomerDetails.find(element=>element.id === "first-name").value,
            lastName: editedCustomerDetails.find(element=>element.id === "last-name").value,
            email: editedCustomerDetails.find(element=>element.id === "email").value,
            phone: editedCustomerDetails.find(element=>element.id === "phone").value,
            addresses: []
        }

        editedCustomerDetails.forEach(element => {
            if (element.requiredField){
                if (element.value === ""){
                    error = "Please fill the required fields!"
                }
            }
        })

        if (error === ""){
            try{
                this.setState({customerDetailsEditModalMessage:"Please wait!"})
                let headers= {
                    'Authorization': `Bearer ${this.props.user.jwtToken.jwt}`,
                    'Content-Type': 'application/json',
                }


                const api = axios.create({
                    baseURL: "http://localhost:8080/customers",
                    headers: headers
                })
                const res = await api.put(`/${this.state.selectedCustomerId}`, editedCustomer);
                if((res.status === 200) && (res.data !== -1)){
                    let [tmpCustomer, tmpAddresses] = this.loadCustomerToDetailElements(res.data)
                    this.setState({customerDetailsEditModalMessage:"", customerDetailsElements:tmpCustomer, customerAddresses:tmpAddresses})
                    return true;
                }else{
                    this.setState({customerDetailsEditModalMessage:"An error occured while updating customer!"})
                    return false;
                }
            }catch{
                this.setState({customerDetailsEditModalMessage:"An error occured while updating customer!"})
                return false;
            }

        }else{
            this.setState({customerDetailsEditModalMessage:error})
            return false;
        }
    }


    // Input: editted customer address details and its index 
    //      update the customerAddressElement in state
    //      send an api request to update the customer in database
    async updateAddress(index, editedCustomerAddressDetails){
        var error = "";
        const addressId = editedCustomerAddressDetails[0].addressId;
        editedCustomerAddressDetails.forEach(element => {
            if (element.requiredField){
                if (element.value === ""){
                    error = "Please fill the required fields!"
                }
            }
        })

        var editedCustomerAddress = {
            country: editedCustomerAddressDetails.find(element=>element.id === "country").value,
            state: editedCustomerAddressDetails.find(element=>element.id === "state").value,
            city: editedCustomerAddressDetails.find(element=>element.id === "city").value,
            postalCode: editedCustomerAddressDetails.find(element=>element.id === "postal-code").value,
            address: editedCustomerAddressDetails.find(element=>element.id === "address").value,
        }

        if (error === ""){
            const isNewAddress = this.state.newlyAddedAddressIndex >= 0
            try{
                // check whether the address is a newly created address or not
                //      newly created address: a new address in process of initialization. 
                //      The newly created address does not exist in the database yet.
                if (isNewAddress){
                    // The address is a newly created address and does not exist in database. so it has to be created
                    this.setState({customerAddressEditModalMessage:"Please wait!"})
                    let headers= {
                        'Authorization': `Bearer ${this.props.user.jwtToken.jwt}`,
                        'Content-Type': 'application/json',
                    }
    
    
                    const api = axios.create({
                        baseURL: "http://localhost:8080/customers",
                        headers: headers
                    })
                    const res = await api.post(`/${this.state.selectedCustomerId}/address`, editedCustomerAddress);
                    if((res.status === 200) && (res.data !== -1)){
                        console.log(res)
                        let addresses = this.loadAddressToDetailElements([res.data])
                        let tempAddresses = this.state.customerAddresses
                        tempAddresses[index] = addresses[0]
                        this.setState({newlyAddedAddressIndex:-1, customerAddressEditModalMessage:"", customerAddresses: [...tempAddresses]})
                        return true;
                    }else{
                        this.setState({customerAddressEditModalMessage:"An error occured while creating the address!"})
                        return false;
                    }

                }else{
                    // The address already exists in database and it has to be only updated
                    this.setState({customerAddressEditModalMessage:"Please wait!"})
                    let headers= {
                        'Authorization': `Bearer ${this.props.user.jwtToken.jwt}`,
                        'Content-Type': 'application/json',
                    }
    
    
                    const api = axios.create({
                        baseURL: "http://localhost:8080/customers",
                        headers: headers
                    })
                    const res = await api.put(`/${this.state.selectedCustomerId}/address/${addressId}`, editedCustomerAddress);
                    if((res.status === 200) && (res.data !== -1)){
                        let addresses = this.loadAddressToDetailElements([res.data])
                        let tempAddresses = this.state.customerAddresses
                        tempAddresses[index] = addresses[0]
                        this.setState({customerAddressEditModalMessage:"", customerAddresses: [...tempAddresses]})
                        return true;
                    }else{
                        this.setState({customerAddressEditModalMessage:"An error occured while updating the address!"})
                        return false;
                    }
                }
                
            }catch{
                if (isNewAddress){
                    this.setState({customerAddressEditModalMessage:"An error occured while creating the address!"})
                }else{
                    this.setState({customerAddressEditModalMessage:"An error occured while updating the address!"})
                }
                return false;
            }

        }else{
            this.setState({customerAddressEditModalMessage:error})
            return false;
        }
    }


    // send an api request to delete this customer
    deleteCustomer(){
        this.setState({deleting:true, blockingModalMessage:"Deleting customer"})
        let headers= {
            'Authorization': `Bearer ${this.props.user.jwtToken.jwt}`,
            'Content-Type': 'application/json',
        }


        const api = axios.create({
            baseURL: "http://localhost:8080/customers",
            headers: headers
        })
        api.delete(`/${this.state.selectedCustomerId}`).then((res)=>{
            if (res.data === "ok"){
                this.props.history.push("/customers")
            }else{
                this.setState({deleteCustomerErrorModalIsOpen:true, deleting:false, blockingModalMessage:""})
            }
        }).catch(()=>{
            this.setState({deleteCustomerErrorModalIsOpen:true, deleting:false, blockingModalMessage:""})
        })
    }

    // send an api request to delete the address
    deleteAddress(index){
        
        this.setState({deleting:true, blockingModalMessage:"Deleting address"})

        const addressId = this.state.customerAddresses[index][0].addressId

        let headers= {
            'Authorization': `Bearer ${this.props.user.jwtToken.jwt}`,
            'Content-Type': 'application/json',
        }


        const api = axios.create({
            baseURL: "http://localhost:8080/customers",
            headers: headers
        })

        api.delete(`/${this.state.selectedCustomerId}/address/${addressId}`).then((res)=>{
            if (res.data === "ok"){
                var tempCustomerAddresses = this.state.customerAddresses
                tempCustomerAddresses.splice(index, 1)
                this.setState({customerAddresses: [...tempCustomerAddresses], deleting:false, blockingModalMessage:""})
            }else{
                this.setState({deleteAddressErrorModalIsOpen:true, deleting:false, blockingModalMessage:""})
            }
        }).catch(()=>{
            this.setState({deleteAddressErrorModalIsOpen:true, deleting:false, blockingModalMessage:""})
        })
    }



    render(){

        const addNewAddressButtonClickHandler = () => {
            var newAddress = lodashClonedeep(customerAddressElementsTemplate)
            const newlyAddedAddressIndex = this.state.customerAddresses.length
            newAddress.key = newlyAddedAddressIndex
            this.setState({newlyAddedAddressIndex:newlyAddedAddressIndex, customerAddresses:[...this.state.customerAddresses, newAddress]})
        }

        const deleteAddressHandler = (index) => {
            if (index === this.state.newlyAddedAddressIndex){
                // if is newly added address means the values are being entered by user, and it does not exist in database yet 
                var tempCustomerAddresses = lodashClonedeep(this.state.customerAddresses)
                tempCustomerAddresses.splice(index, 1)
                this.setState({newlyAddedAddressIndex:-1, customerAddresses: [...tempCustomerAddresses]})
            }else{
                this.setState({addressIndexToDelete:index})
                this.deleteAddress(index)
            }
        }


        const deleteCustomerHandler = () => {
            this.deleteCustomer()
        }


        const editCustomerDetailsHandler = async (editedCustomerDetails) => {
            const isUpdateSuccessful = await this.updateCustomer(editedCustomerDetails)
            return isUpdateSuccessful;
        }


        const editAddressHandler = async (index, editedAddress) => {
            const isUpdateSuccessful = await this.updateAddress(index, editedAddress)
            return (isUpdateSuccessful)
        }


        const errorModalCloseHandler = () => {
            this.props.history.push("/")
        }

        const errorModalRetryHandler = () => {
            this.setState({loadCustomerErrorModalIsOpen:false})
            this.loadCustomer()
        }

        const deleteCustomerErrorModalCloseHandler = () => {
            this.setState({deleteCustomerErrorModalIsOpen:false})
        }

        const deleteCustomerErrorModalRetryHandler = () => {
            this.setState({deleteCustomerErrorModalIsOpen:false})
            this.deleteCustomer()
        }

        const deleteAddressErrorModalCloseHandler = () => {
            this.setState({deleteAddressErrorModalIsOpen:false, addressIndexToDelete:-1})
        }

        const deleteAddressErrorModalRetryHandler = () => {
            this.setState({deleteAddressErrorModalIsOpen:false})
            this.deleteAddress(this.state.addressIndexToDelete)
        }






        return( 
            <div className="container-fluid">

                {/* A modal to display error in loading the customer */}
                <ErrorModal 
                    show={this.state.loadCustomerErrorModalIsOpen} 
                    closeHandler={errorModalCloseHandler}
                    retryHandler={errorModalRetryHandler}
                    closeButtonTitle="Homepage"
                    retryButtonTitle="Retry"
                    errorTitle="Error"
                    errorText={"An error occured while loading customers!"}
                />

                {/* A modal to display error in deleting the customer */}
                <ErrorModal 
                    show={this.state.deleteCustomerErrorModalIsOpen} 
                    closeHandler={deleteCustomerErrorModalCloseHandler}
                    retryHandler={deleteCustomerErrorModalRetryHandler}
                    closeButtonTitle="Cancel"
                    retryButtonTitle="Retry"
                    errorTitle="Error"
                    errorText={"An error occured while deleting the customer!"}
                />

                {/* A modal to display error in deleting an address */}
                <ErrorModal 
                    show={this.state.deleteAddressErrorModalIsOpen} 
                    closeHandler={deleteAddressErrorModalCloseHandler}
                    retryHandler={deleteAddressErrorModalRetryHandler}
                    closeButtonTitle="Cancel"
                    retryButtonTitle="Retry"
                    errorTitle="Error"
                    errorText={"An error occured while deleting the address!"}
                />

                {/* A modal to display message of loading data */}
                <BlockingModal
                    show={this.state.loadingData}
                    title="Please wait!"
                    message={"Loading Data!"}
                />

                {/* A modal to display message of deleting data */}
                <BlockingModal
                    show={this.state.deleting}
                    title="Please wait!"
                    message={this.state.blockingModalMessage}
                />

                
                <div className="row">
                    <div className="col">
                        {/* Card to show customer details */}
                        <DetailsCard editable={true} deletable={true} editModalMessage={this.state.customerDetailsEditModalMessage} onCardDelete={deleteCustomerHandler} onCardEdit={editCustomerDetailsHandler} cardTitle="Customer Details" cardId="customer-details" cardElements={this.state.customerDetailsElements} />
                    </div>
                </div>


                {this.state.customerAddresses.map((addressElements, index) => (
                    <div key={index.toString()} className="row">
                        <div className="col">
                            {/* Card to show customer address */}
                            {/* if needInput is true means new address is created and it needs to ask user for inputs */}
                            <DetailsCard id={index} editable={true} deletable={true} initNeeded={addressElements[0].value===""} editModalMessage={this.state.customerAddressEditModalMessage} onCardDelete={deleteAddressHandler} onCardEdit={editAddressHandler} cardTitle="Customer Address" cardId={"customer-address-"+index} cardElements={addressElements} />
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

const mapStateToProps = state => ({
    user: state.login.user
})

export default connect(mapStateToProps, {})(withRouter(ViewSingleCustomer));