import React, {Component} from 'react';

import MainCard from '../widgets/MainCard';



// React table
import BootstrapTableCardWithFilters from '../widgets/TableCard/BootstrapTableCardWithFilters';







  


class ViewCustomers extends Component{

    
    render(){

        // const filterElements = [{title:"Customer ID", value:"", id:"customer-id", colSize:"col-md-3", inputType:"text"},
        // {title:"Name", value:"", id:"name", colSize:"col-md-3", inputType:"text"},
        // {"title":"Country", "value":"", "id":"country", "colSize":"col-md-3", "inputType":"text"},
        // {"title":"City", "value":"", "id":"city", "colSize":"col-md-3", "inputType":"text"},
        // ]

        const tableCols=[{
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

        const tableRows=[{href:"view_customer.html", id:"c_11111", firstName:"Oliver", lastName:"Oliver", email:"oliver@people.com", phone:"+987654321"},
            {href:"view_customer.html", id:"c_12222", firstName:"Liam", lastName:"Liam", email:"liam@people.com", phone:"+227654999"},
            {href:"view_customer.html", id:"c_13333", firstName:"Sophia", lastName:"Sophia", email:"sophia@people.com", phone:"+227654999"},
            {href:"view_customer.html", id:"c_14444", firstName:"William", lastName:"William", email:"william@people.com", phone:"+227654999"},
            {href:"view_customer.html", id:"c_15555", firstName:"Emma", lastName:"Emma", email:"emma@people.com", phone:"+227654999"},
            {href:"view_customer.html", id:"c_22222", firstName:"Liam", lastName:"Liam", email:"liam@people.com", phone:"+227654999"},
            {href:"view_customer.html", id:"c_23333", firstName:"Sophia", lastName:"Sophia", email:"sophia@people.com", phone:"+227654999"},
            {href:"view_customer.html", id:"c_24444", firstName:"William", lastName:"William", email:"william@people.com", phone:"+227654999"},
            {href:"view_customer.html", id:"c_25555", firstName:"Emma", lastName:"Emma", email:"emma@people.com", phone:"+227654999"},
            {href:"view_customer.html", id:"c_32222", firstName:"Liam", lastName:"Liam", email:"liam@people.com", phone:"+227654999"},
            {href:"view_customer.html", id:"c_33333", firstName:"Sophia", lastName:"Sophia", email:"sophia@people.com", phone:"+227654999"},
            {href:"view_customer.html", id:"c_34444", firstName:"William", lastName:"William", email:"william@people.com", phone:"+227654999"},
            {href:"view_customer.html", id:"c_35555", firstName:"Emma", lastName:"Emma", email:"emma@people.com", phone:"+227654999"},
            {href:"view_customer.html", id:"c_42222", firstName:"Liam", lastName:"Liam", email:"liam@people.com", phone:"+227654999"},
            {href:"view_customer.html", id:"c_43333", firstName:"Sophia", lastName:"Sophia", email:"sophia@people.com", phone:"+227654999"},
            {href:"view_customer.html", id:"c_44444", firstName:"William", lastName:"William", email:"william@people.com", phone:"+227654999"},
            {href:"view_customer.html", id:"c_45555", firstName:"Emma", lastName:"Emma", email:"emma@people.com", phone:"+227654999"},
        ]



//         const products = [  {id:'123', name:'record 1', price:2},
//                     {id:'124', name:'record 2', price:2},
//                     {id:'125', name:'record 1', price:2},
//                     {id:'126', name:'record 1', price:2},
//                     {id:'127', name:'record 2', price:2},
//                     {id:'128', name:'record 1', price:2},
//                     {id:'133', name:'record 1', price:2},
//                     {id:'134', name:'record 1', price:2},
//                     {id:'135', name:'record 2', price:2},
//                     {id:'136', name:'record 1', price:2},
//                     {id:'137', name:'record 1', price:2},
//                     {id:'138', name:'record 1', price:2},
//                     {id:'223', name:'record 1', price:2},
//                     {id:'224', name:'record 2', price:2},
//                     {id:'225', name:'record 1', price:2},
//                     {id:'226', name:'record 1', price:2},
//                     {id:'227', name:'record 1', price:2},
//                     {id:'228', name:'record 1', price:2},
//                     {id:'233', name:'record 1', price:2},
//                     {id:'234', name:'record 1', price:2},
//                     {id:'235', name:'record 1', price:2},
//                     {id:'236', name:'record 1', price:2},
//                     {id:'237', name:'record 1', price:2},
//                     {id:'238', name:'record 1', price:2}];


// const columns = [{
//     dataField: 'id',
//     text: 'Product ID',
//     filter: textFilter()
//     }, {
//     dataField: 'name',
//     text: 'Product Name',
//     filter: textFilter()
//     }, {
//     dataField: 'price',
//     text: 'Product Price',
//     filter: textFilter()
// }];


        // const products = [{id:'123', name:'record 1', price:2},
        //             {id:'123', name:'record 1', price:2},
        //             {id:'124', name:'record 1', price:2},
        //             {id:'125', name:'record 1', price:2},
        //             {id:'126', name:'record 1', price:2},
        //             {id:'127', name:'record 1', price:2},
        //             {id:'128', name:'record 1', price:2}];

        // const columns = [{
        //     dataField: 'id',
        //     text: 'Product ID'
        //     }, {
        //     dataField: 'name',
        //     text: 'Product Name'
        //     }, {
        //     dataField: 'price',
        //     text: 'Product Price'
        // }];



        return(

            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <BootstrapTableCardWithFilters cardTitle="Customers" tableCols={tableCols} tableRows={tableRows}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewCustomers;