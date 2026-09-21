/**
 * Made with assistance of Claude AI agent.
 */
export class NoteView {
    constructor(noteData, container, callbacks) {
        //Instance variables
        this.id = noteData.id;
        this.callbacks = callbacks;

        // Creating the Note component onto the DOM
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'note-item';

        this.textarea = document.createElement('textarea');
        this.textarea.className = 'note-textarea';
        this.textarea.value = noteData.content;
        this.textarea.placeholder = STRINGS.writer.textareaPlaceholder;
        this.textarea.addEventListener('input', () => this.handleChange());

        this.removeButton = document.createElement('button');
        this.removeButton.type = 'button';
        this.removeButton.classList.add("btn", "btn-danger")
        this.removeButton.textContent = STRINGS.writer.removeButtonLabel;
        this.removeButton.addEventListener('click', () => this.remove());

        this.wrapper.appendChild(this.textarea);
        this.wrapper.appendChild(this.removeButton);
        container.appendChild(this.wrapper);
    }

    // Updates the text area with the latest text area value
    handleChange() {
        if (typeof this.callbacks.onChange === 'function') {
            this.callbacks.onChange(this.id, this.textarea.value);
        }
    }

    // Removes this note's textarea + button from the DOM instantly, and
    // notifies the owner so it can remove the note from storage instantly.
    remove() {
        this.wrapper.remove();
        if (typeof this.callbacks.onRemove === 'function') {
            this.callbacks.onRemove(this.id);
        }
    }

    getContent() {
        return this.textarea.value;
    }
}