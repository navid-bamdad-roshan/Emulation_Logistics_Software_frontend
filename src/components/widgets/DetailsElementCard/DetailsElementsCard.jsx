
// Card to show details

import React, {Component} from 'react';

import { Modal, Button } from "react-bootstrap";



import {NonEditableDetailsElement, InputDetailsElement} from './DetailsElement';

// props: cardTitle, cardElements
// cardElements: Array of( ex:{"title":"First Name", "value":"John", "id":"first-name", "colSize":"col-lg-6", "inputType":"text"} )
class EditableDetailsCardWithModal extends Component{
    // var customerDetailsElements = [{"title":"First Name", "value":"John", "id":"first-name", "colSize":"col-lg-6", "inputType":"text"},
    //                                 {"title":"Last Name", "value":"Snow", "id":"last-name", "colSize":"col-lg-6", "inputType":"text"},
    //                                 {"title":"Email", "value":"person@people.com", "id":"email", "colSize":"col-lg-6", "inputType":"email"},
    //                                 {"title":"Phone", "value":"+987654321", "id":"phone", "colSize":"col-lg-6", "inputType":"tel"},
    //                                 {"title":"Customer ID", "value":"c_1234", "id":"id", "colSize":"col-lg-6", "inputType":"text"},
    // ]

    state={
        editModalIsOpen:false
    }

    openEditModal = () => this.setState({ editModalIsOpen: true });
    onCancelEditModal = () => {
        this.setState({ editModalIsOpen: false })
    };
    onSaveEditModal = () => {
        this.setState({ editModalIsOpen: false })
        //TODO save the changes
    };


    render(){


        return(
                <div className="card">
                    <div className="card-header">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <h3 className="mb-0">{this.props.cardTitle}</h3>
                            </div>
                            <div className="col-4 text-right">
                                {/* <!-- Button trigger modal --> */}
                                <Button onClick={this.openEditModal} type="button" className="btn btn-sm btn-primary">
                                Edit
                                </Button>
                                {/* <!-- Edit Modal --> */}
                                <Modal show={this.state.editModalIsOpen} size="lg" aria-labelledby={"edit-modal-"+this.props.cardId} onHide={this.onCancelEditModal}>
                                    <Modal.Header closeButton>
                                        <Modal.Title id={"edit-modal-"+this.props.cardId}>{"Edit "+(this.props.cardTitle)}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="container-fluid">
                                            <div className="row">
                                                {this.props.cardElements.filter(element => element.id !== "id").map(element =>(
                                                    <InputDetailsElement key={element.id} title={element.title} value={element.value} id={element.id} colSize={element.colSize} inputType={this.props.inputType}/>
                                                ))}
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button type="button" onClick={this.onCancelEditModal} className="btn btn-secondary">Close</Button>
                                        <Button type="button" onClick={this.onSaveEditModal} className="btn btn-primary">Save changes</Button>
                                    </Modal.Footer>
                                </Modal>
                                {/* <div className="modal fade bd-example-modal-lg" id={"edit-modal-"+this.props.cardId} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id={"edit-modal-"+this.props.cardId+"-title"}>{"Edit "+(this.props.cardTitle)}</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="container-fluid">
                                                    <div className="row">
                                                        {this.props.cardElements.filter(element => element.id !== "id").map(element =>(
                                                            <InputDetailsElement key={element.id} title={element.title} value={element.value} id={element.id} colSize={element.colSize} inputType={this.props.inputType}/>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary">Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <form>
                        <div className="pl-lg-4">
                            
                            <div className="row">

                                {this.props.cardElements.map(element =>(
                                    <NonEditableDetailsElement key={element.id} title={element.title} value={element.value} id={element.id} colSize={element.colSize}/>
                                ))}
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
        );
    }
}










class EditableDeletableDetailsCardWithModal extends Component{
    // var customerDetailsElements = [{"title":"First Name", "value":"John", "id":"first-name", "colSize":"col-lg-6", "inputType":"text"},
    //                                 {"title":"Last Name", "value":"Snow", "id":"last-name", "colSize":"col-lg-6", "inputType":"text"},
    //                                 {"title":"Email", "value":"person@people.com", "id":"email", "colSize":"col-lg-6", "inputType":"email"},
    //                                 {"title":"Phone", "value":"+987654321", "id":"phone", "colSize":"col-lg-6", "inputType":"tel"},
    //                                 {"title":"Customer ID", "value":"c_1234", "id":"id", "colSize":"col-lg-6", "inputType":"text"},
    // ]

    constructor(props){
        super(props);

        // if true, details data should be set using activating the edit modal
        let initNeeded  = false

        if (props.initNeeded){
            initNeeded = true
        }


        this.state={
            editModalIsOpen:false,
            deleteModalIsOpen:false,
            initNeeded:initNeeded
        }
    }



    openEditModal = () => this.setState({ editModalIsOpen: true });
    onCancelEditModal = () => {
        this.setState({ editModalIsOpen: false })
        if (this.state.initNeeded){
            this.props.onCardDelete(this.props.id)
        }
    };
    onSaveEditModal = () => {
        if (this.state.initNeeded){
            this.setState({ editModalIsOpen: false, initNeeded: false })
        }else{
            this.setState({ editModalIsOpen: false })
        }

        //TODO send the edited card elements
        this.props.onCardEdit(this.props.id, this.props.cardElements)
        
        
    };


    openDeleteModal = () => this.setState({ deleteModalIsOpen: true });
    onCancelDeleteModal = () => {
        this.setState({ deleteModalIsOpen: false })
    };
    onDeleteDeleteModal = () => {
        this.setState({ deleteModalIsOpen: false })
        this.props.onCardDelete(this.props.id)
    };


    


    render(){

        if (this.state.initNeeded && !this.state.editModalIsOpen){
            this.openEditModal()
        }


        return(
                <div className="card">
                    <div className="card-header">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <h3 className="mb-0">{this.props.cardTitle}</h3>
                            </div>
                            <div className="col-4 text-right">
                                {/* <!-- Button trigger modal --> */}
                                <Button onClick={this.openEditModal} type="button" className="btn btn-sm btn-primary">
                                Edit
                                </Button>
                                <Button onClick={this.openDeleteModal} type="button" className="btn btn-sm btn-primary">
                                Delete
                                </Button>
                                {/* <!-- Edit Modal --> */}
                                <Modal show={this.state.editModalIsOpen} size="lg" aria-labelledby={"edit-modal-"+this.props.cardId} onHide={this.onCancelEditModal}>
                                    <Modal.Header closeButton>
                                        <Modal.Title id={"edit-modal-"+this.props.cardId}>{"Edit "+(this.props.cardTitle)}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="container-fluid">
                                            <div className="row">
                                                {this.props.cardElements.filter(element => element.id !== "id").map(element =>(
                                                    <InputDetailsElement key={element.id} title={element.title} value={element.value} id={element.id} colSize={element.colSize} inputType={this.props.inputType}/>
                                                ))}
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button type="button" onClick={this.onCancelEditModal} className="btn btn-secondary">Close</Button>
                                        <Button type="button" onClick={this.onSaveEditModal} className="btn btn-primary">Save changes</Button>
                                    </Modal.Footer>
                                </Modal>

                                {/* <!-- Delete Modal --> */}
                                <Modal show={this.state.deleteModalIsOpen} size="lg" aria-labelledby={"delete-modal-"+this.props.cardId} onHide={this.onCancelDeleteModal}>
                                    <Modal.Header closeButton>
                                        <Modal.Title id={"delete-modal-"+this.props.cardId}>{"Edit "+(this.props.cardTitle)}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="container-fluid">
                                            <div className="row">
                                                <h3>
                                                    {"Are you sure you want to delete "+this.props.cardTitle+"?"}  
                                                </h3>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button type="button" onClick={this.onCancelDeleteModal} className="btn btn-secondary">Cancel</Button>
                                        <Button type="button" onClick={this.onDeleteDeleteModal} className="btn btn-primary">Delete</Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <form>
                        <div className="pl-lg-4">
                            
                            <div className="row">

                                {this.props.cardElements.map(element =>(
                                    <NonEditableDetailsElement key={element.id} title={element.title} value={element.value} id={element.id} colSize={element.colSize}/>
                                ))}
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
        );
    }
}








// props: cardTitle, cardElements
// cardElements: Array of( ex:{"title":"First Name", "value":"John", "id":"first-name", "colSize":"col-lg-6", "inputType":"text"} )
class InputDetailsCardWithModal extends Component{
    // var customerDetailsElements = [{"title":"First Name", "value":"John", "id":"first-name", "colSize":"col-lg-6", "inputType":"text"},
    //                                 {"title":"Last Name", "value":"Snow", "id":"last-name", "colSize":"col-lg-6", "inputType":"text"},
    //                                 {"title":"Email", "value":"person@people.com", "id":"email", "colSize":"col-lg-6", "inputType":"email"},
    //                                 {"title":"Phone", "value":"+987654321", "id":"phone", "colSize":"col-lg-6", "inputType":"tel"},
    //                                 {"title":"Customer ID", "value":"c_1234", "id":"id", "colSize":"col-lg-6", "inputType":"text"},
    // ]



    render(){


        return(
                <div className="card">
                    <div className="card-header">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <h3 className="mb-0">{this.props.cardTitle}</h3>
                            </div>
                            <div className="col-4 text-right">

                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <form>
                        <div className="pl-lg-4">
                            
                            <div className="row">

                                {this.props.cardElements.map(element =>(
                                    <InputDetailsElement key={element.id} title={element.title} value={element.value} id={element.id} colSize={element.colSize}/>
                                ))}
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
        );
    }
}







// props: cardTitle, cardElements
// cardElements: Array of( ex:{"title":"First Name", "value":"John", "id":"first-name", "colSize":"col-lg-6", "inputType":"text"} )
class DeletableInputDetailsCardWithModal extends Component{
    // var customerDetailsElements = [{"title":"First Name", "value":"John", "id":"first-name", "colSize":"col-lg-6", "inputType":"text"},
    //                                 {"title":"Last Name", "value":"Snow", "id":"last-name", "colSize":"col-lg-6", "inputType":"text"},
    //                                 {"title":"Email", "value":"person@people.com", "id":"email", "colSize":"col-lg-6", "inputType":"email"},
    //                                 {"title":"Phone", "value":"+987654321", "id":"phone", "colSize":"col-lg-6", "inputType":"tel"},
    //                                 {"title":"Customer ID", "value":"c_1234", "id":"id", "colSize":"col-lg-6", "inputType":"text"},
    // ]


    onCardDelete = () => {
        this.props.onCardDelete(this.props.id)
    };


    render(){


        return(
                <div className="card">
                    <div className="card-header">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <h3 className="mb-0">{this.props.cardTitle}</h3>
                            </div>
                            <div className="col-4 text-right">
                                <Button onClick={this.onCardDelete} type="button" className="btn btn-sm btn-primary">
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <form>
                        <div className="pl-lg-4">
                            
                            <div className="row">

                                {this.props.cardElements.map(element =>(
                                    <InputDetailsElement key={element.id} title={element.title} value={element.value} id={element.id} colSize={element.colSize}/>
                                ))}
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
        );
    }
}










// props: cardTitle, cardElements
// cardElements: Array of( ex:{"title":"Customer ID", "value":"", "id":"customer-id", "colSize":"col-md-6", "inputType":"text"} )
function FilterDetailsCard(props){

    // var filterElements = [{"title":"Customer ID", "value":"", "id":"customer-id", "colSize":"col-md-6", "inputType":"text"},
    //                         {"title":"Name", "value":"", "id":"name", "colSize":"col-md-6", "inputType":"text"},
    //                         {"title":"Country", "value":"", "id":"country", "colSize":"col-md-6", "inputType":"text"},
    //                         {"title":"City", "value":"", "id":"city", "colSize":"col-md-6", "inputType":"text"},
    // ]


    return(
        <div className="card">
            <div className="card-header border-0">
                <div className="row align-items-center">
                    <div className="col">
                        <h3 className="mb-0">{props.cardTitle}</h3>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <form>
                    <div className="row justify-content-center">
                        
                        {props.cardElements.map(element=>(
                            <InputDetailsElement title={element.title} value={element.value} id={element.id} colSize={element.colSize} inputType={props.inputType}/>
                        ))}

                        {/* Search button */}
                        <div className="col-md-12 d-flex justify-content-end">
                            {/* <label> </label> */}
                            <div className="text-center">
                                <button type="button" className="btn btn-primary">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}


export{
    EditableDetailsCardWithModal,
    EditableDeletableDetailsCardWithModal,
    InputDetailsCardWithModal,
    DeletableInputDetailsCardWithModal,
    FilterDetailsCard
}