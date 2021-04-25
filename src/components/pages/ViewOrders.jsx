import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import { connect } from 'react-redux';


import axios from "axios";



// React table
import BootstrapTableCardWithFilters from '../widgets/TableCard/BootstrapTableCardWithFilters';


import ErrorModal from '../widgets/ErrorModal';
import MainCard from '../widgets/MainCard';





class ViewOrders extends Component{

    constructor(){
        super()
        this.state={
            loadOrdersErrorModalIsOpen:false,
            loadingData:false,
            tableRows:[]
        }
    }


    tableCols=[{
        dataField: 'id',
        text: 'Order ID',
        }, {
        dataField: 'senderFirstName',
        text: 'Sender First Name',
        }, {
        dataField: 'senderLastName',
        text: 'Sender Last Name',
        }, {
        dataField: 'receiverFirstName',
        text: 'Receiver First Name',
        }, {
        dataField: 'receiverLastName',
        text: 'Receiver Last Name',
        }, {
        dataField: 'description',
        text: 'Description',
        }, {
        dataField: 'packageCount',
        text: 'Package Count',
        }, {
        dataField: 'shipmentsCount',
        text: 'Shipment Count',
    }];

    orderTemplate={href:"view_order.html", id:"", senderFirstName:"", senderLastName:"", receiverFirstName:"", receiverLastName:"", description:"", packageCount:"", shipmentsCount:""}

    

    componentDidMount(){
        this.loadOrders()
    }

    async loadOrders(){
        try{
            this.setState({loadingData:true})
            let headers= {
                    'Authorization': `Bearer ${this.props.user.jwtToken.jwt}`,
                    'Content-Type': 'application/json',
                }
            const api = axios.create({
                baseURL: "http://localhost:8080/orders",
                //withCredentials: true,
                headers: headers
            })
            const res = await api.get('');
            if(res.status === 200){
                this.setOrdersToTableRows(res.data)
                this.setState({loadingData:false})
            }else{
                this.setState({loadOrdersErrorModalIsOpen:true, loadingData:false})
            }
        }catch{
            this.setState({loadOrdersErrorModalIsOpen:true, loadingData:false})
        }
    }

    setOrdersToTableRows(orders){
        var tmpTableRows=[]
        orders.forEach(order => {
            var tmp = {...this.orderTemplate}
            this.tableCols.forEach(col => {
                tmp[col.dataField] = order[col.dataField]
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
            this.setState({loadOrdersErrorModalIsOpen:false})
            this.loadOrders()
        }


        return(

            <div className="container-fluid">

                {/* A modal to display error in loading the orders */}
                <ErrorModal 
                    show={this.state.loadOrdersErrorModalIsOpen} 
                    closeHandler={errorModalCloseHandler}
                    retryHandler={errorModalRetryHandler}
                    closeButtonTitle="Homepage"
                    retryButtonTitle="Retry"
                    errorTitle="Error"
                    errorText={"An error occured while loading orders!"}
                />

                {this.state.loadingData && <MainCard cardTitle={"Loading Data!"}><h3> Please wait! </h3></MainCard>}
                


                <div className="row">
                    <div className="col">
                        {/* A table to list all orders */}
                        <BootstrapTableCardWithFilters cardTitle="Orders" tableRowClickDestination="/orders/view/" tableCols={this.tableCols} tableRows={this.state.tableRows}/>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.login.user
})

export default connect(mapStateToProps, {})(withRouter(ViewOrders));