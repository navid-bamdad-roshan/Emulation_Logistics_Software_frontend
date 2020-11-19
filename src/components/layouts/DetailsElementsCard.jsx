
// Card to show details




import {NonEditableDetailsElement, InputDetailsElement} from './DetailsElementCard/DetailsElement';

// props: cardTitle, cardElements
// cardElements: Array of( ex:{"title":"First Name", "value":"John", "id":"first-name", "colSize":"6"} )
function EditableDetailsCardWithModal(props){

    // var detailElements = [{"title":"First Name", "value":"John", "id":"first-name", "colSize":"6"},
    //                         {"title":"Last Name", "value":"Snow", "id":"last-name", "colSize":"6"},
    //                         {"title":"Email", "value":"person@people.com", "id":"email", "colSize":"6"},
    //                         {"title":"Phone", "value":"+987654321", "id":"phone", "colSize":"6"},
    //                         {"title":"Customer ID", "value":"c_1234", "id":"id", "colSize":"6"},
    //                     ]

    return(
        <dev>
            <div className="card">
                <div className="card-header">
                    <div className="row align-items-center">
                        <div className="col-8">
                            <h3 className="mb-0">{props.cardTitle}</h3>
                        </div>
                        <div className="col-4 text-right">
                            {/* <!-- Button trigger modal --> */}
                            <button type="button" className="btn btn-sm btn-primary" data-toggle="modal" data-target={"#edit-modal-"+props.cardId}>
                            Edit
                            </button>
                            {/* <!-- Modal --> */}
                            <div className="modal fade bd-example-modal-lg" id={"edit-modal-"+props.cardId} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id={"edit-modal-"+props.cardId+"-title"}>{"Edit "+(props.cardTitle)}</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="container-fluid">
                                                <div className="row">
                                                    {props.cardElements.filter(element => element.id != "id").map(element =>(
                                                        <InputDetailsElement title={element.title} value={element.value} id={element.id} colSize={element.colSize} inputType={props.inputType}/>
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <form>
                    <div className="pl-lg-4">
                        
                        <div className="row">

                            {props.cardElements.map(element =>(
                                <NonEditableDetailsElement title={element.title} value={element.value} id={element.id} colSize={element.colSize}/>
                            ))}
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </dev>
    );
}


export{
    EditableDetailsCardWithModal
}