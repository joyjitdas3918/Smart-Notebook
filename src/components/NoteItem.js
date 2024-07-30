import React, {useContext, useEffect} from 'react'
import noteContext from '../notes/NoteContext';
import { useNavigate } from 'react-router-dom';


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    
    let navigate = useNavigate();
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={()=>{
                                if(!localStorage.getItem('token')){
                                    navigate('/login')
                                }
                            else{
                                deleteNote(note._id); 
                             
                            props.showAlert("Your note has been deleted succesfully","success")}}}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{
                            if(!localStorage.getItem('token')){
                                navigate('/login')
                            }
                            else updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem