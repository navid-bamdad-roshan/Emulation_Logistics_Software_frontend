import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { withRouter } from "react-router-dom";
import MainCard from '../MainCard';



//  props:
//  cardTitle
//  tableCols
//  tableRows
class BootstrapTableCard extends Component {

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
              //this.props.history.push(`/customers/view/${row.id}`);
              this.handleClick(row.id);
            },
          };

        return (
            <div>
                <MainCard cardTitle={this.props.cardTitle}>
                <div>
                    <BootstrapTable
                    striped
                    hover
                    keyField="id"
                    data={ this.state.rows }
                    columns={ this.props.tableCols }
                    rowEvents = {rowEvents}
                    />
                </div>
                </MainCard>
        </div >
        );
    }
}



export default withRouter(BootstrapTableCard);