import React, {Component} from 'react';


class MainCard extends Component{
    render(){
        return(
            <div className="card">
                <div className="card-header border-0">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="mb-0">{this.props.cardTitle}</h3>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row justify-content-center">
                        <div className='col-12'>
                            <div className="pl-lg-4">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainCard;