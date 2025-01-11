/* eslint-disable react/prop-types */
// import { useNotes } from "../../context/NotesContext";
// import { Edit2, Trash2, Calendar } from "lucide-react";

// const NoteCard = ({ note }) => {
//   const { deleteNote, editNote } = useNotes();

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
//       <div className="p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             {note.title}
//           </h3>
//           <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
//             {note.category}
//           </span>
//         </div>

//         <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
//           {note.content}
//         </p>

//         <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
//           <div className="flex items-center">
//             <Calendar className="h-4 w-4 mr-1" />
//             <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
//           </div>

//           <div className="flex space-x-2">
//             <button
//               onClick={() => editNote(note)}
//               className="p-1 hover:text-blue-600 dark:hover:text-blue-400"
//             >
//               <Edit2 className="h-4 w-4" />
//             </button>
//             <button
//               onClick={() => deleteNote(note._id)}
//               className="p-1 hover:text-red-600 dark:hover:text-red-400"
//             >
//               <Trash2 className="h-4 w-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoteCard;

import { useState } from "react";
import { useNotes } from "../../context/NotesContext";
import { Edit2, Trash2, Calendar } from "lucide-react";
import EditNoteModal from "./EditNoteModal";

const NoteCard = ({ note }) => {
  const { deleteNote } = useNotes();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteNote(note._id);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const isEdited =
    new Date(note.updatedAt).getTime() > new Date(note.createdAt).getTime();

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {note.title}
            </h3>
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
              {note.category}
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {note.content}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                {isEdited
                  ? `Edited at ${new Date(note.updatedAt).toLocaleDateString()}`
                  : new Date(note.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                className="p-1 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={handleDelete}
                className="p-1 hover:text-red-600 dark:hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditNoteModal
        note={note}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
};

export default NoteCard;
