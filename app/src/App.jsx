import { useState, useEffect } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import noteService from './services/notes';
import logService from './services/logs';
import Logs from './Logs';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [logs, setLogs] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showNotes, setShowNotes] = useState(true);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    logService.getAll().then((logs) => {
      setLogs(logs);
    });
  }, [showNotes]);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote('');
    });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleShowLogs = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setShowNotes(false);
  };

  const handleShowNotes = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setShowNotes(true);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  if (showNotes) {
    return (
      <div>
        <h1>
          Notes <button onClick={handleShowLogs}>Show Logs</button>
        </h1>
        <Notification message={errorMessage} />
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all'}
          </button>
        </div>
        <ul>
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
        <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange} />
          <button type="submit">save</button>
        </form>
        <Footer />
      </div>
    );
  } else {
    return <Logs handleShowNotes={handleShowNotes} logs={logs} />;
  }
};

export default App;
