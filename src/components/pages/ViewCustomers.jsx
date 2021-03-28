import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import { connect } from 'react-redux';

import { login } from '../../redux/actions/loginAction';

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

    

    componentDidMount(){
        //tmp
        //this.props.login("navid", "kkjjhhggffddssaa")

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

                {/* A modal to display error in loading the customers */}
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

                        {/* tmp */}
                        <h1>{this.props.user.username}</h1>

                        {/* A table to list all customers */}
                        <BootstrapTableCardWithFilters cardTitle="Customers" tableRowClickDestination="/customers/view/" tableCols={this.tableCols} tableRows={this.state.tableRows}/>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.login.user
})

export default connect(mapStateToProps, { login })(withRouter(ViewCustomers));