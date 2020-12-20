import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

// React table
import BootstrapTableCard from '../widgets/TableCard/BootstrapTableCard';




import NotesCard from '../widgets/NotesCard';





class Dashboard extends Component{
    render(){

        const tableCols=[{
            dataField: 'id',
            text: 'Order ID',
            }, {
            dataField: 'receiver',
            text: 'Receiver',
            }, {
            dataField: 'origin',
            text: 'Origin',
            }, {
            dataField: 'destination',
            text: 'Destination',
            }, {
            dataField: 'date',
            text: 'Date',
            }, {
            dataField: 'status',
            text: 'Status',
        }];

        const tableRows=[{id:"1111", receiver:"Receiver 1", origin:"City 11", destination:"City 12", date:"2020/09/01", status:"Status"},
                        {id:"2222", receiver:"Receiver 2", origin:"City 21", destination:"City 22", date:"2020/08/25", status:"Status"},
                        {id:"3333", receiver:"Receiver 3", origin:"City 31", destination:"City 32", date:"2020/08/15", status:"Status"},
                        {id:"4444", receiver:"Receiver 4", origin:"City 41", destination:"City 42", date:"2020/08/01", status:"Status"},
                        {id:"5555", receiver:"Receiver 5", origin:"City 51", destination:"City 52", date:"2020/07/21", status:"Status"},
                        {id:"6666", receiver:"Receiver 6", origin:"City 61", destination:"City 62", date:"2020/07/18", status:"Status"},
        ]



        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <BootstrapTableCard cardTitle="Orders" tableRowClickDestination="/orders/view/" tableCols={tableCols} tableRows={tableRows}/>
                    </div>
                </div>


                <div className="row">
                    <div className="col-12">
                        <NotesCard/>
                    </div>
                </div>



            </div>
        );
    }
}

export default withRouter(Dashboard);