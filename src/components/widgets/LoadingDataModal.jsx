import React from 'react';
import {Modal} from 'react-bootstrap';


// Modal to show errors
function LoadingDataModal(props){
    return(
        <Modal
            
            show={props.show}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>Please wait!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Loading Data
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}

export default LoadingDataModal


