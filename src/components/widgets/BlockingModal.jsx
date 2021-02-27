import React from 'react';
import {Modal} from 'react-bootstrap';


// Modal to block user interface
function BlockingModal(props){
    return(
        <Modal
            
            show={props.show}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.message}
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}

export default BlockingModal


