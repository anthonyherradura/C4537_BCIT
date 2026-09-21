/**
 * Made with assistance of Claude AI agent.
 */
import { NotesManager } from "./classes/NotesManager.js";

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("homeBtn").textContent = STRINGS.writer.backButtonLabel;

    const statusLabel = document.getElementById("readStatus");
    const notesContainer = document.getElementById("notesContainer");

    const notesManager = new NotesManager(STRINGS.storageKey);
    
    const formatTimestamp = () => new Date().toLocaleTimeString();
    const updateReadStatus = () => {
        statusLabel.textContent = `${STRINGS.reader.updatedPrefix} ${formatTimestamp()}`;
    };

    const renderNotes = () => {
        const notes = notesManager.loadFromStorage();
        notesContainer.innerHTML = '';

        if (notes.length != 0) {
            notes.forEach((note) => {
                const readOnlyArea = document.createElement("textarea");
                readOnlyArea.className = "note-textarea";
                readOnlyArea.value = note.content;
                readOnlyArea.readOnly = true;
                notesContainer.appendChild(readOnlyArea);
            });
        }
        updateReadStatus();
    };

    renderNotes();
    setInterval(renderNotes, 2000);

    // This event occurs when localStorage changes in a new tab/window of the same browser
    window.addEventListener('storage', (event) => {
        if (event.key === STRINGS.storageKey) {
            renderNotes();
        }
    });
});