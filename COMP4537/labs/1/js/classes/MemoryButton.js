/**
 * Built with development assistance from Claude.
 */

export class MemoryButton {
  constructor(order, color) {
    this.order = order;
    this.color = color;
    this.isRevealed = false;
    this.clickHandler = null;

    this.element = document.createElement("button");
    this.element.classList.add("memory-button");
    this.element.style.backgroundColor = this.color;
    this.element.setAttribute("aria-label", "Memory game button");
    this.element.disabled = true;
  }

  renderInitialLabel() {
    this.element.textContent = this.order + 1;
    this.isRevealed = true;
  }

  hideLabel() {
    this.element.textContent = "";
    this.isRevealed = false;
  }

  reveal() {
    this.element.textContent = this.order + 1;
    this.isRevealed = true;
  }

  moveTo(x, y) {
    this.element.style.position = "fixed";
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  }

  enableClicks(callback) {
    this.clickHandler = () => callback(this);
    this.element.addEventListener("click", this.clickHandler);
    this.element.disabled = false;
  }

  disableClicks() {
    this.element.disabled = true;
    if (this.clickHandler) {
      this.element.removeEventListener("click", this.clickHandler);
    }
  }

  getElement() {
    return this.element;
  }

  getWidth() {
    return this.element.offsetWidth;
  }

  getHeight() {
    return this.element.offsetHeight;
  }
}