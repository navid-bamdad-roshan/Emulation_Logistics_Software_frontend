

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
//import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";


import MainCard from '../MainCard';








//  props:
//  cardTitle
//  tableCols
//  tableRows
class BootstrapTableCardWithFilters extends Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    state={
        rows: this.props.tableRows
    }

    handleClick(rowId){
        this.props.history.push(this.props.tableRowClickDestination + rowId);
    }


    render() {





        const rowEvents = {
            onClick: (e, row, rowIndex) => {
              console.log(`clicked on row with index: ${row.id}`);
              //this.props.history.push(`/customers/view/${row.id}`);
              this.handleClick(row.id);
            },
          //   onMouseEnter: (e, row, rowIndex) => {
          //     console.log(`enter on row with index: ${row.id}`);
          //   }
          };

          
        const options = {
            custom: true,
            paginationSize: 4,
            pageStartIndex: 1,
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true,
            totalSize: this.state.rows.length
        };


        var tableCols = this.props.tableCols
        tableCols.map(col =>
            col.filter = textFilter()
        )


        const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
            <PaginationListStandalone { ...paginationProps } />
            <div>
            <div>
                <BootstrapTable
                striped
                hover
                keyField="id"
                data={ this.state.rows }
                columns={ this.props.tableCols }
                rowEvents = {rowEvents}
                filter={ filterFactory() }
                { ...paginationTableProps }
                />
            </div>
            </div>
            <PaginationListStandalone { ...paginationProps } />
        </div>
        );

        return (
            <div>
                <MainCard cardTitle={this.props.cardTitle}>
                    <PaginationProvider pagination={paginationFactory(options)}>
                        { contentTable }
                    </PaginationProvider>
                </MainCard>
        </div >
        );
    }
}



export default withRouter(BootstrapTableCardWithFilters);