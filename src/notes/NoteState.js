import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  /*const state1={
        "name": "Joyjit",
    }*/
  //const [state, setState]=useState(state1);
  /*const update=()=>{
        setTimeout(() => {
            setState({
                "name": "Joyjit Das"
            })
        }, 1000);
    }*/
  const host = "http://localhost:5000";

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  const getNotes = async () => {
    //get all notes
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    //console.log(json);
    setNotes(json);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //API
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    //client
    //console.log('oii');
    let note = {
      _id: "66a5254bbgcfa8922aaa50c957cc",
      user: "66a4a491e1d336f2351df056",
      title: title,
      description: description,
      tag: tag,
      date: "2024-07-27T16:50:19.222Z",
      __v: 0,
    };
    note = await response.json();
    setNotes(notes.concat(note));
    //console.log(note);
  };

  //Delete a note
  const deleteNote = async (id) => {
    //API
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    //console.log(response.json);

    //client end
    setNotes(
      notes.filter((note) => {
        return note._id !== id;
      })
    );
  };

  //Update a note
  const editNote = async (id, title, description, tag) => {
    //API
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    //logic for client
    let newNotes = notes;
    for (let i = 0; i < notes.length; i++) {
      const ele = notes[i];
      if (ele._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes([].concat(newNotes));
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;

/*<NoteContext.Provider value={{state, update}}>
{
    props.children
}
</NoteContext.Provider>*/