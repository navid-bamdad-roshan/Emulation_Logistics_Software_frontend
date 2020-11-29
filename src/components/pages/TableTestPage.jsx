import React, {Component} from 'react';

import MainCard from '../widgets/MainCard';



// React table
import BootstrapTable from '../widgets/BootstrapTable';







  


class TableTestPage extends Component{

    
    render(){

        return(

            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <MainCard cardTitle="React Table Test">
                            <BootstrapTable/>
                        </MainCard>
                    </div>
                </div>
            </div>
        );
    }
}

export default TableTestPage;