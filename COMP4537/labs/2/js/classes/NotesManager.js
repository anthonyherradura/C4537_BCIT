/**
 * Made with assistance of Claude AI agent.
 */
export class NotesManager {
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.notesList = [];
    }

    saveToStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.notesList));
    }

    loadFromStorage() {
        const raw = localStorage.getItem(this.storageKey);

        if (!raw) {
            this.notesList = [];
            return this.notesList;
        }

        this.notesList = JSON.parse(raw);
        return this.notesList;
    }

    addNote(content = '') {
        const note = {
            id: NotesManager.generateId(),
            content,
            timestamp: Date.now(),
        };
        this.notesList.push(note);
        this.saveToStorage();
        return note;
    }

    removeNote(id) {
        this.notesList = this.notesList.filter((note) => note.id !== id);
        this.saveToStorage();
    }

    updateNoteContent(id, content) {
        const note = this.notesList.find((currentNote) => currentNote.id === id);
        if (note) {
            note.content = content;
            note.timestamp = Date.now();
        }
    }

    getNotes() {
        return this.notesList;
    }

    static generateId() {
        return `note-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    }
}