// props: title, value, colSize
function NonEditableDetailsElement(props) {
    return (
        <div className={"col-lg-"+(props.colSize)}>
            <div className="form-group">
                <label className="form-control-label">{props.title}</label>
                <br/>
                <span>{props.value}</span>
            </div>
        </div>
    );
}


// props: title, value, id, colSize, inputType
function InputDetailsElement(props) {
    return (
        <div className={"col-lg-"+(props.colSize)}>
            <div className="form-group">
                <label className="form-control-label" for={"input-"+props.id} style={{"float":"left"}}>{props.title}</label>
                <input type={props.inputType} id={"input-"+props.id} className="form-control" placeholder={props.title} defaultValue={props.value}/>
            </div>
        </div>
    );
}

export {
    NonEditableDetailsElement,
    InputDetailsElement,
  }

