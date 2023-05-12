export class NavigationSelection extends HTMLElement {
  static get observedAttributes() {
    return ["value"];
  }

  get value() {
    return this.getAttribute("value");
  }

  set value(newValue) {
    this.setAttribute("value", newValue);
  }

  connectedCallback() {
    this.innerHTML = `
      <img src="/images/dark/left-arrow.svg">
      <span>${this.value}</span>`;

    this.addEventListener("click", () => {
      this.value = "";
      this.dispatchEvent(new Event("change"));
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const span = this.querySelector("span");
    if (name === "value" && span) this.querySelector("span").innerHTML = newValue;
  }
}

customElements.define("navigation-selection", NavigationSelection);
