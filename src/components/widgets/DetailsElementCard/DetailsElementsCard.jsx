
// Card to show details

import React, {Component} from 'react';

import { Modal, Button } from "react-bootstrap";



import {NonEditableDetailsElement, InputDetailsElement} from './DetailsElement';


const lodashClonedeep = require("lodash.clonedeep");





// props: cardId, cardTitle, cardElements, id(optional), editable(optional){onCardEdit}, deletable(optional){onCardDelete}, initNeeded(optional)
// cardElements: Array of( ex:{"title":"First Name", "value":"John", "id":"first-name", "colSize":"col-lg-6", "inputType":"text"} )
class DetailsCard extends Component{
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

        // if true, details data should be editable with edit button
        let editable  = false

        // if true, details data should be deletable with delete button
        let deletable  = false

        // id is for cases that multiple DetailsCard is used by mapping, and they are identified by index as id
        // if passIdAsArgument==false, id will not be passed as an argument to onCardDelete and onCardEdit
        let passIdAsArgument = false

        if (props.initNeeded){
            initNeeded = true
        }

        if (props.editable){
            editable = true
        }

        if (props.deletable){
            deletable = true
        }

        if (props.id || props.id === 0){
            passIdAsArgument = true
        }


        this.state={
            editModalIsOpen:false,
            deleteModalIsOpen:false,
            initNeeded:initNeeded,
            editable:editable,
            deletable:deletable,
            passIdAsArgument:passIdAsArgument,
            editedCardElements:lodashClonedeep(props.cardElements)
        }
    }


    

    openEditModal = () => this.setState({ editModalIsOpen: true, editedCardElements:lodashClonedeep(this.props.cardElements) });

    onCancelEditModalHandler = () => {
        this.setState({ editModalIsOpen: false, editedCardElements:lodashClonedeep(this.props.cardElements) })
        if (this.state.initNeeded){
            if(this.state.passIdAsArgument){
                this.props.onCardDelete(this.props.id)
            }
            else{
                this.props.onCardDelete()
            }    
        }
    };

    onSaveEditModalHandler = async () => {

        var isUpdateSuccessful = false;

        //TODO send the edited card elements
        if(this.state.editable){
            if(this.state.passIdAsArgument){
                isUpdateSuccessful = await this.props.onCardEdit(this.props.id, lodashClonedeep(this.state.editedCardElements))
            }
            else{
                isUpdateSuccessful = await this.props.onCardEdit(lodashClonedeep(this.state.editedCardElements))
            }
        }
        if (isUpdateSuccessful === true){
            if (this.state.initNeeded){
                this.setState({ editModalIsOpen: false, initNeeded: false })
            }else{
                this.setState({ editModalIsOpen: false })
            }
        }
    };

    onEditModalChildInputValueChangeHandler = (id, newValue) => {
        let tempEditedCardElements = this.state.editedCardElements
        let tempIndex = tempEditedCardElements.findIndex(element => element.id === id)
        if(tempIndex > -1){
            tempEditedCardElements[tempIndex].value = newValue
            this.setState({editedCardElements:tempEditedCardElements})
        }
    }




    openDeleteModal = () => this.setState({ deleteModalIsOpen: true });
    onCancelDeleteModalHandler = () => {
        this.setState({ deleteModalIsOpen: false })
    };
    onDeleteDeleteModalHandler = () => {
        this.setState({ deleteModalIsOpen: false })
        if(this.state.deletable){
            if(this.state.passIdAsArgument){
                this.props.onCardDelete(this.props.id)
            }
            else{
                this.props.onCardDelete()
            }   
        }
        
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
                                {this.state.editable &&
                                <Button onClick={this.openEditModal} type="button" className="btn btn-sm btn-primary">
                                Edit
                                </Button>
                                }
                                {this.state.deletable &&
                                <Button onClick={this.openDeleteModal} type="button" className="btn btn-sm btn-primary">
                                Delete
                                </Button>
                                }
                                {/* <!-- Edit Modal --> */}
                                <Modal show={this.state.editModalIsOpen} size="lg" aria-labelledby={"edit-modal-"+this.props.cardId} onHide={this.onCancelEditModalHandler}>
                                    <Modal.Header closeButton>
                                        <Modal.Title id={"edit-modal-"+this.props.cardId}>{"Edit "+(this.props.cardTitle)}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="container-fluid">
                                            <div className="row">
                                                {this.state.editedCardElements.filter(element => element.id !== "id").map(element =>(
                                                    <InputDetailsElement key={element.id} onInputValueChange={this.onEditModalChildInputValueChangeHandler} title={element.title} value={element.value} id={element.id} colSize={element.colSize} inputType={this.props.inputType}  requiredField={element.requiredField}/>
                                                ))}
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-lg-8 col-sm-5 col-12 pb-2">
                                                    <span>{this.props.editModalMessage}</span>
                                                </div>
                                                <div className="col-lg-4 col-sm-7 col-12">
                                                    <div class="d-flex justify-content-around">
                                                        <Button type="button" onClick={this.onCancelEditModalHandler} className="btn btn-secondary">Close</Button>
                                                        <Button type="button" onClick={this.onSaveEditModalHandler} className="btn btn-primary">Save changes</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal.Footer>
                                </Modal>

                                {/* <!-- Delete Modal --> */}
                                <Modal show={this.state.deleteModalIsOpen} size="lg" aria-labelledby={"delete-modal-"+this.props.cardId} onHide={this.onCancelDeleteModalHandler}>
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
                                        <Button type="button" onClick={this.onCancelDeleteModalHandler} className="btn btn-secondary">Cancel</Button>
                                        <Button type="button" onClick={this.onDeleteDeleteModalHandler} className="btn btn-primary">Delete</Button>
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












// props: cardTitle, cardElements, onCardInputValueChange, id(optional), deletable(optional){onCardDelete}
// cardElements: Array of( ex:{"title":"First Name", "value":"John", "id":"first-name", "colSize":"col-lg-6", "inputType":"text"} )
class InputDetailsCard extends Component{
    // var customerDetailsElements = [{"title":"First Name", "value":"John", "id":"first-name", "colSize":"col-lg-6", "inputType":"text"},
    //                                 {"title":"Last Name", "value":"Snow", "id":"last-name", "colSize":"col-lg-6", "inputType":"text"},
    //                                 {"title":"Email", "value":"person@people.com", "id":"email", "colSize":"col-lg-6", "inputType":"email"},
    //                                 {"title":"Phone", "value":"+987654321", "id":"phone", "colSize":"col-lg-6", "inputType":"tel"},
    //                                 {"title":"Customer ID", "value":"c_1234", "id":"id", "colSize":"col-lg-6", "inputType":"text"},
    // ]

    constructor(props){
        super(props);

        // if true, details data should be deletable with delete button
        let deletable  = false

        // id is for cases that multiple DetailsCard is used by mapping, and they are identified by index as id
        // if passIdAsArgument==false, id will not be passed as an argument to onCardDelete and onCardEdit
        let passIdAsArgument = false

        if (props.deletable){
            deletable = true
        }

        if (props.id || props.id === 0){
            passIdAsArgument = true
        }


        this.state={
            deletable:deletable,
            passIdAsArgument:passIdAsArgument,
        }
    }


    onCardDeleteHandler = () => {
        if (this.state.passIdAsArgument){
            this.props.onCardDelete(this.props.id)
        }else{
            this.props.onCardDelete()
        }
    };


    onChildInputValueChangeHandler = (elementId, newValue) => {

        if(this.state.passIdAsArgument){
            this.props.onCardInputValueChange(this.props.id, elementId, newValue)
        }else{
            this.props.onCardInputValueChange(elementId, newValue)
        }
    }


    render(){


        return(
                <div className="card">
                    <div className="card-header">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <h3 className="mb-0">{this.props.cardTitle}</h3>
                            </div>
                            {this.state.deletable &&
                            <div className="col-4 text-right">
                                <Button onClick={this.onCardDeleteHandler} type="button" className="btn btn-sm btn-primary">
                                    Delete
                                </Button>
                            </div>
                            }
                        </div>
                    </div>
                    <div className="card-body">
                        <form>
                        <div className="pl-lg-4">
                            
                            <div className="row">

                                {this.props.cardElements.map(element =>(
                                    <InputDetailsElement key={element.id} onInputValueChange={this.onChildInputValueChangeHandler} title={element.title} value={element.value} id={element.id} colSize={element.colSize} requiredField={element.requiredField}/>
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
    DetailsCard,
    InputDetailsCard,
    FilterDetailsCard
}