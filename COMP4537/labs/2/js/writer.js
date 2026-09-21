/**
 * Made with assistance of Claude AI agent.
 */
import { NotesManager } from "./classes/NotesManager.js";
import { NoteView } from "./classes/NoteView.js";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("homeBtn").textContent = STRINGS.writer.backButtonLabel;
    document.getElementById('addNoteBtn').textContent = STRINGS.writer.addButtonLabel;

    const notesContainer = document.getElementById('notesContainer');
    const addButton = document.getElementById('addNoteBtn');
    const statusLabel = document.getElementById('saveStatus');
    const notesManager = new NotesManager(STRINGS.storageKey);

    const formatTimestamp = () => new Date().toLocaleTimeString();

    const updateSaveStatus = () => {
        statusLabel.textContent = `${STRINGS.writer.savedPrefix} ${formatTimestamp()}`;
    };

    const renderNote = (noteData) => {
        const view = new NoteView(noteData, notesContainer, {
            onChange: (id, content) => notesManager.updateNoteContent(id, content),
            onRemove: (id) => {
                notesManager.removeNote(id);
                updateSaveStatus();
            },
        });
    } 

    const addNewNote = () => {
        const noteData = notesManager.addNote('');
        renderNote(noteData);
        updateSaveStatus();
    }
    addButton.addEventListener("click", addNewNote);

    notesManager.loadFromStorage().forEach(renderNote);

    setInterval(() => {
        notesManager.saveToStorage();
        updateSaveStatus();
    }, 2000);

    updateSaveStatus();
})