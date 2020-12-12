
// Card to show details




import {NonEditableDetailsElement, InputDetailsElement} from './DetailsElement';

// props: cardTitle, cardElements
// cardElements: Array of( ex:{"title":"First Name", "value":"John", "id":"first-name", "colSize":"col-lg-6", "inputType":"text"} )
function EditableDetailsCardWithModal(props){


    // var customerDetailsElements = [{"title":"First Name", "value":"John", "id":"first-name", "colSize":"col-lg-6", "inputType":"text"},
    //                                 {"title":"Last Name", "value":"Snow", "id":"last-name", "colSize":"col-lg-6", "inputType":"text"},
    //                                 {"title":"Email", "value":"person@people.com", "id":"email", "colSize":"col-lg-6", "inputType":"email"},
    //                                 {"title":"Phone", "value":"+987654321", "id":"phone", "colSize":"col-lg-6", "inputType":"tel"},
    //                                 {"title":"Customer ID", "value":"c_1234", "id":"id", "colSize":"col-lg-6", "inputType":"text"},
    // ]

    return(
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
                            <div className="modal fade bd-example-modal-lg" id={"edit-modal-"+props.cardId} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                                        <InputDetailsElement key={element.id} title={element.title} value={element.value} id={element.id} colSize={element.colSize} inputType={props.inputType}/>
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
                                <NonEditableDetailsElement key={element.id} title={element.title} value={element.value} id={element.id} colSize={element.colSize}/>
                            ))}
                        </div>
                    </div>
                    </form>
                </div>
            </div>
    );
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
    FilterDetailsCard
}