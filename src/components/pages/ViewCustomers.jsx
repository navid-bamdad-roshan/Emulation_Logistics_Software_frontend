import React, {Component} from 'react';

import {FilterDetailsCard} from '../widgets/DetailsElementCard/DetailsElementsCard';
import TableCard from '../widgets/TableCard/TableCard';


class ViewCustomers extends Component{
    render(){

        var filterElements = [{"title":"Customer ID", "value":"", "id":"customer-id", "colSize":"col-md-3", "inputType":"text"},
                            {"title":"Name", "value":"", "id":"name", "colSize":"col-md-3", "inputType":"text"},
                            {"title":"Country", "value":"", "id":"country", "colSize":"col-md-3", "inputType":"text"},
                            {"title":"City", "value":"", "id":"city", "colSize":"col-md-3", "inputType":"text"},
        ]

        var tableHead=["Customer ID", "First name", "Last name", "Email", "Phone", ]
        var tableRows=[{"href":"view_customer.html", "elements":["c_1111", "Oliver", "Oliver", "oliver@people.com", "+987654321"]},
                        {"href":"view_customer.html", "elements":["c_2222", "Liam", "Liam", "liam@people.com", "+227654999"]},
                        {"href":"view_customer.html", "elements":["c_3333", "Sophia", "Sophia", "sophia@people.com", "+227654999"]},
                        {"href":"view_customer.html", "elements":["c_4444", "William", "William", "william@people.com", "+227654999"]},
                        {"href":"view_customer.html", "elements":["c_5555", "Emma", "Emma", "emma@people.com", "+227654999"]},
        ]


        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <FilterDetailsCard cardTitle='Filters' cardElements={filterElements}/>
                    </div>
                </div>


                <div class = "row">
                    <div className="col">
                        <TableCard cardTitle="Filters" tableHead={tableHead} tableRows={tableRows}/>
                    </div>
                </div>
            </div>

        );
    }
}

export default ViewCustomers;