
import React, { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
// import { nanoid } from "nanoid"
import {
  onSnapshot,
  addDoc,
  doc,
  deleteDoc
} from 'firebase/firestore'
import { notesCollection, db } from "./firebase"

export default function App() {
    const [notes, setNotes] = useState([])
    const [currentNoteId, setCurrentNoteId] = useState("")
    
    const currentNote = 
        notes.find(note => note.id === currentNoteId) 
        || notes[0]

    useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
          // Sync up our local notes array with the snapshot data
          const notesArray = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }))
          setNotes(notesArray)
        })
        return unsubscribe
    }, [])

    useEffect(() => {
      if (!currentNoteId) {
        setCurrentNoteId(notes[0]?.id)
      }
    }, [notes])

    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here"
        }
       const newNoteRef = await addDoc(notesCollection, newNote)
        setCurrentNoteId(newNoteRef.id)
    }

    function updateNote(text) {
      const docRef = doc(db, 'notes', noteId)
    }

    async function deleteNote(noteId) {
      const docRef = doc(db, 'notes', noteId)
      await deleteDoc(docRef)
    }

    return (
        <main className="main">
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            notes={notes}
                            currentNote={currentNote}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                        />
                        {
                            <Editor
                                currentNote={currentNote}
                                updateNote={updateNote}
                            />
                        }
                    </Split>
                    :
                    <div className="no-notes">
                        <h1>You have no notes</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}
                        >
                            Create one now
                </button>
                    </div>

            }
        </main>
    )
}



