// props: title, value, colSize
function NonEditableDetailsElement(props) {
    return (
        <div className={(props.colSize)}>
            <div className="form-group">
                <label className="form-control-label">{props.title}</label>
                <br/>
                <span>{props.value}</span>
            </div>
        </div>
    );
}


// props: onInputValueChange, title, value, id, colSize, inputType
function InputDetailsElement(props) {
    const onInputValueChange = (e) => {
        props.onInputValueChange(props.id, e.target.value)
    }
    return (
        <div className={(props.colSize)}>
            <div className="form-group">
                <label className="form-control-label" htmlFor={"input-"+props.id} style={{"float":"left"}}>{props.title}{props.requiredField && <p className="text-danger" style={{"display":"inline"}}>*</p>}</label>
                <input onChange={onInputValueChange} type={props.inputType} id={"input-"+props.id} className="form-control" placeholder={props.title} value={props.value}/>
            </div>
        </div>
    );
}

export {
    NonEditableDetailsElement,
    InputDetailsElement,
  }

