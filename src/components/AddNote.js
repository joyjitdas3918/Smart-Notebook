import React, { useContext, useState } from 'react'
import noteContext from '../notes/NoteContext'
import { useNavigate } from 'react-router-dom';

const AddNote = (props) => {
  const navigate=useNavigate()
    const context=useContext(noteContext);
    const {addNote} =context;
    const[note,setNote]=useState({title: "", description:"", tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
        if(!localStorage.getItem('token')){
          navigate('/login')
      }
      else{
        addNote(note.title, note.description,note.tag);
        props.showAlert("Your note has been added succesfully","success");
        setNote({title: "", description:"", tag:""})
      }
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value}) //keep remaining just change what is changed

    }
  return (
    <div className="container my-3">
      <h2>Add Note</h2>
      <form>
      <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title (more than 3 letters): 
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Description (more than 5 letters): 
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Tag: 
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        
        
        <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
      </div>
  )
}

export default AddNote