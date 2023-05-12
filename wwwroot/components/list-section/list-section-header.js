export class ListSectionHeader extends HTMLElement {
  static get observedAttributes() {
    return ["singular", "plural", "order", "value"];
  }

  get singular() {
    return this.getAttribute("singular");
  }
  get plural() {
    return this.getAttribute("plural");
  }
  get order() {
    return this.getAttribute("order");
  }
  get value() {
    return this.getAttribute("value") ?? 0;
  }

  set singular(newValue) {
    this.setAttribute("singular", newValue);
  }
  set plural(newValue) {
    this.setAttribute("plural", newValue);
  }
  set order(newValue) {
    this.setAttribute("order", newValue);
  }
  set value(newValue) {
    this.setAttribute("value", newValue);
  }

  connectedCallback() {
    this.innerHTML = `
      <strong>0 ${this.plural}</strong>
      <span>BY ${this.order}</span>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const count = this.querySelector("strong");
    const order = this.querySelector("span");
    const intValue = parseInt(this.value);

    if (count)
      count.innerText = `${this.value} ${
        intValue === 0 || intValue > 1 ? this.plural : this.singular
      }`;
    if (order) order.innerText = `BY ${this.order}`;
  }
}

customElements.define("list-section-header", ListSectionHeader);
