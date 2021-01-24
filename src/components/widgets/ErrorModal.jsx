import React from 'react';
import {Modal, Button} from 'react-bootstrap';


// Modal to show errors
function ErrorModal(props){
    return(
        <Modal
            
            show={props.show}
            onHide={props.closeHandler}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.errorTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.errorText}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.closeHandler}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ErrorModal


