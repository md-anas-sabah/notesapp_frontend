/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { notesAPI } from "../services/api";

const NotesContext = createContext();

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await notesAPI.getNotes();
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (noteData) => {
    try {
      const response = await notesAPI.createNote(noteData);
      setNotes((prevNotes) => [...prevNotes, response.data]);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to create note");
    }
  };

  const updateNote = async (id, noteData) => {
    try {
      const response = await notesAPI.updateNote(id, noteData);
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? response.data : note))
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update note");
    }
  };

  const deleteNote = async (id) => {
    try {
      await notesAPI.deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete note");
    }
  };

  const searchNotes = async (query) => {
    try {
      const response = await notesAPI.searchNotes(query);
      setNotes(response.data);
    } catch (error) {
      console.error("Error searching notes:", error);
    }
  };

  const filterByCategory = async (category) => {
    try {
      if (category) {
        const response = await notesAPI.getNotesByCategory(category);
        setNotes(response.data);
      } else {
        // If no category is provided, fetch all notes
        await fetchNotes();
      }
    } catch (error) {
      console.error("Error filtering notes:", error);
    }
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <NotesContext.Provider
      value={{
        notes,
        fetchNotes,
        createNote,
        updateNote,
        deleteNote,
        searchNotes,
        filterByCategory,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
