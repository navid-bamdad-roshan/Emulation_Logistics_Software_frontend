import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import axios from "axios";



// React table
import BootstrapTableCardWithFilters from '../widgets/TableCard/BootstrapTableCardWithFilters';


import ErrorModal from '../widgets/ErrorModal';
import MainCard from '../widgets/MainCard';


const api = axios.create({
    baseURL: "http://localhost:8080/customers"
})







class ViewCustomers extends Component{

    constructor(){
        super()
        this.state={
            loadCustomersErrorModalIsOpen:false,
            loadingData:false,
            tableRows:[]
        }
    }


    tableCols=[{
        dataField: 'id',
        text: 'Customer ID',
        }, {
        dataField: 'firstName',
        text: 'First Name',
        }, {
        dataField: 'lastName',
        text: 'last Name',
        }, {
        dataField: 'email',
        text: 'Email',
        }, {
        dataField: 'phone',
        text: 'Phone',
    }];

    customerTemplate={href:"view_customer.html", id:"", firstName:"", lastName:"", email:"", phone:""}

    // tableRows=[{href:"view_customer.html", id:"c_11111", firstName:"Oliver", lastName:"Oliver", email:"oliver@people.com", phone:"+987654321"},
    //     {href:"view_customer.html", id:"c_12222", firstName:"Liam", lastName:"Liam", email:"liam@people.com", phone:"+227654999"},
    //     {href:"view_customer.html", id:"c_13333", firstName:"Sophia", lastName:"Sophia", email:"sophia@people.com", phone:"+227654999"},
    //     {href:"view_customer.html", id:"c_14444", firstName:"William", lastName:"William", email:"william@people.com", phone:"+227654999"},
    //     {href:"view_customer.html", id:"c_15555", firstName:"Emma", lastName:"Emma", email:"emma@people.com", phone:"+227654999"},
    //     {href:"view_customer.html", id:"c_22222", firstName:"Liam", lastName:"Liam", email:"liam@people.com", phone:"+227654999"},
    //     {href:"view_customer.html", id:"c_23333", firstName:"Sophia", lastName:"Sophia", email:"sophia@people.com", phone:"+227654999"},
    //     {href:"view_customer.html", id:"c_24444", firstName:"William", lastName:"William", email:"william@people.com", phone:"+227654999"},
    //     {href:"view_customer.html", id:"c_25555", firstName:"Emma", lastName:"Emma", email:"emma@people.com", phone:"+227654999"},
    //     {href:"view_customer.html", id:"c_32222", firstName:"Liam", lastName:"Liam", email:"liam@people.com", phone:"+227654999"},
    //     {href:"view_customer.html", id:"c_33333", firstName:"Sophia", lastName:"Sophia", email:"sophia@people.com", phone:"+227654999"},
    //     {href:"view_customer.html", id:"c_34444", firstName:"William", lastName:"William", email:"william@people.com", phone:"+227654999"},
    //     {href:"view_customer.html", id:"c_35555", firstName:"Emma", lastName:"Emma", email:"emma@people.com", phone:"+227654999"},
    //     {href:"view_customer.html", id:"c_42222", firstName:"Liam", lastName:"Liam", email:"liam@people.com", phone:"+227654999"},
    //     {href:"view_customer.html", id:"c_43333", firstName:"Sophia", lastName:"Sophia", email:"sophia@people.com", phone:"+227654999"},
    //     {href:"view_customer.html", id:"c_44444", firstName:"William", lastName:"William", email:"william@people.com", phone:"+227654999"},
    //     {href:"view_customer.html", id:"c_45555", firstName:"Emma", lastName:"Emma", email:"emma@people.com", phone:"+227654999"},
    // ]


    componentDidMount(){
        this.loadCustomers()
    }

    async loadCustomers(){
        try{
            this.setState({loadingData:true})
            const res = await api.get('');
            if(res.status === 200){
                this.setCustomersToTableRows(res.data)
                this.setState({loadingData:false})
            }else{
                this.setState({loadCustomersErrorModalIsOpen:true, loadingData:false})
            }
        }catch{
            this.setState({loadCustomersErrorModalIsOpen:true, loadingData:false})
        }
    }

    setCustomersToTableRows(customers){
        var tmpTableRows=[]
        customers.forEach(customer => {
            var tmp = {...this.customerTemplate}
            this.tableCols.forEach(col => {
                tmp[col.dataField] = customer[col.dataField]
            })
            tmpTableRows.push(tmp)
        })
        this.setState({tableRows:tmpTableRows})
    }
    

    render(){

        const errorModalCloseHandler = () => {
            this.props.history.push("/")
        }

        const errorModalRetryHandler = () => {
            this.setState({loadCustomersErrorModalIsOpen:false})
            this.loadCustomers()
        }


        return(

            <div className="container-fluid">
                <ErrorModal 
                    show={this.state.loadCustomersErrorModalIsOpen} 
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
                        
                        <BootstrapTableCardWithFilters cardTitle="Customers" tableRowClickDestination="/customers/view/" tableCols={this.tableCols} tableRows={this.state.tableRows}/>
                    </div>
                </div>

            </div>
        );
    }
}

export default withRouter(ViewCustomers);