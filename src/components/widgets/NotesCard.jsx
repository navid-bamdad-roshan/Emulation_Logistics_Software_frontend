import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

import MainCard from './MainCard';
import {InputDetailsElement} from './DetailsElementCard/DetailsElement';


class NotesCard extends Component{
    constructor(props){
        super(props);
        this.currentEditingNoteId = -1
        this.currentEditingNoteText = ""
        this.newNoteText = ""
        this.state = { editModalIsOpen:false, notes: [{id:1, checked:false, text:"Sign contract for \"What are conference organizers afraid of?\""},
                            {id:2, checked:true, text:"Lines From Great Russian Literature? Or E-mails From My Boss?"},
                            {id:3, checked:true, text:"Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit"},
                            {id:4, checked:true, text:"Create 4 Invisible User Experiences you Never Knew About"},
                            {id:5, checked:false, text:"Read \"Following makes Medium better\""},
                            {id:6, checked:false, text:"Unfollow 5 enemies from twitter"}]}
    }



    render(){


        const deleteNoteHandler = (noteId) => {
            let tempNotes = this.state.notes
            let toDeleteIndex = tempNotes.findIndex(element => element.id === noteId)
            if(toDeleteIndex >= 0){
                tempNotes.splice(toDeleteIndex, 1)
                this.setState({notes: tempNotes})
            }
        }

        

        const openEditModal = (note) => {
            this.currentEditingNoteId = note.id
            this.currentEditingNoteText = note.text
            this.setState({editModalIsOpen: true})
        }

        const cancelEditModal = () => {
            this.currentEditingNoteId = -1
            this.currentEditingNoteText = ""
            this.setState({editModalIsOpen: false})
        }

        const saveEditModal = () => {

            // TODO edit the note with id "this.currentEditingNoteId"

            this.currentEditingNoteId = -1
            this.currentEditingNoteText = ""
            this.setState({editModalIsOpen: false})
        }


        const addNewNote = () => {
            //TODO add new note with text "this.newNoteText"

            if (this.newNoteText === ""){
                // If the note text is "", do nothing
                return
            }
            let tempId = 0
            let tempNotes = this.state.notes
            tempNotes.forEach(element => {
                if (tempId <= element.id){
                    tempId = element.id + 1
                }
            })
            tempNotes.push({id:tempId, checked:false, text:this.newNoteText})
            this.newNoteText = ""
            this.input.value = ""
            this.setState({notes: tempNotes})
        }

        const addNewNoteInputChangeHandler = (event) => {
            this.newNoteText = event.target.value
        }

        const onNoteCheckToggleHandler = (noteId) => {
            let tempNotes = this.state.notes
            let toCheckToggleIndex = tempNotes.findIndex(element => element.id === noteId)
            tempNotes[toCheckToggleIndex].checked = !tempNotes[toCheckToggleIndex].checked
            this.setState({notes: tempNotes})
        }


        return(
                <MainCard cardTitle="Notes">
                    <div className="table-full-width">
                        <table className="table">
                            <tbody>
                            {
                                this.state.notes.map(note => (
                                    <tr key={note.id}>
                                        <td>
                                            <div className="form-check">
                                                <label className="form-group-label">
                                                    <input
                                                        onChange={() => {onNoteCheckToggleHandler(note.id)}}
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        checked={note.checked}
                                                    />
                                                    <span className="form-check-sign"></span>
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <span>{note.text}</span>
                                        </td>
                                        <td className="td-actions text-right">
                                            <button className="btn btn-icon btn-info" onClick={() => {openEditModal(note)}} title="Edit Task" type="button">
                                                <span className="btn-inner--icon"><i className="fa fa-edit"></i></span>
                                            </button>
                                            <button className="btn btn-icon btn-danger" onClick={() => {deleteNoteHandler(note.id)}} title="Delete Task" type="button">
                                                <span className="btn-inner--icon"><i className="fa fa-times"></i></span>
                                            </button>
                                        </td>
                                    </tr>))
                                }
                                <tr>
                                    <td></td>
                                    <td>
                                        <form>
                                            <div className="form-group">
                                            <input
                                                onChange={addNewNoteInputChangeHandler}
                                                ref={myinput => (this.input = myinput)}
                                                type="text"
                                                className="form-control"
                                                id="noteInput"
                                                placeholder="Enter note"
                                            />
                                            </div>
                                        </form>
                                    </td>
                                    <td className="td-actions text-left">
                                        <button className="btn btn-icon btn-success" onClick={() => {addNewNote()}} title="Add Note" type="button">
                                            <span className="btn-inner--icon"><i className="fa fa-plus-square" aria-hidden="true"></i></span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <Modal show={this.state.editModalIsOpen} onHide={cancelEditModal} animation={false} size="lg">
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Note</Modal.Title>
                            </Modal.Header>
                                <Modal.Body>
                                    <div className="container-fluid">
                                        <div className="row">
                                            
                                            <InputDetailsElement title="Note" value={this.currentEditingNoteText} id="note" colSize="col-lg-12" inputType="text"/>

                                        </div>
                                    </div>
                                </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={cancelEditModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={saveEditModal}>
                                Save Changes
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </MainCard>
        );
    }
}

export default NotesCard;