export class NavigationItems extends HTMLElement {
  static get observedAttributes() {
    return ["value", "items"];
  }

  get value() {
    return this.getAttribute("value");
  }
  get items() {
    return this.getAttribute("items");
  }

  set value(newValue) {
    this.setAttribute("value", newValue);
  }
  set items(newValue) {
    this.setAttribute("items", newValue);
  }

  connectedCallback() {
    this.innerHTML = `
      <ul>
        ${this.items
          .split(",")
          .map((e) => `<li data-value="${e.toLowerCase()}" class="${e.toLowerCase() === this.value ? "selected" : ""}">${e}</li>`)
          .join("")}
      </ul>
      <select>
        ${this.items
          .split(",")
          .map((e) => `<option value="${e.toLowerCase()}">${e}</option>`)
          .join("")}
      </select>
    `;

    this.querySelector("ul").addEventListener("click", (e) => {
      const selection = e.target.closest("li");

      this.value = selection.dataset.value;
      this.dispatchEvent(new Event("change"));
    });

    this.querySelector("select").addEventListener("change", () => {
      this.value = this.querySelector("select").value;
      this.dispatchEvent(new Event("change"));
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    newValue = newValue.toLowerCase();

    if (name === "items") this.changeItems(newValue);
    else if (name === "value") this.changeValue(newValue);
  }

  changeItems(newValue) {
    const listItems = this.querySelector("ul");
    const selectItems = this.querySelector("select");

    if (listItems)
      listItems.innerHTML = newValue
        .split(",")
        .map((e) => `<li data-value="${e.toLowerCase()}">${e}</li>`)
        .join("");
    if (selectItems)
      selectItems.innerHTML = newValue
        .split(",")
        .map((e) => `<option value="${e.toLowerCase()}">${e}</option>`)
        .join("");
  }
  changeValue(newValue) {
    const liOldSelection = this.querySelector(".selected");
    const liSelection = this.querySelector(`li[data-value="${newValue}"]`);
    const selectItems = this.querySelector("select");

    if (liOldSelection) liOldSelection.classList.remove("selected");
    if (liSelection) liSelection.classList.add("selected");
    if (selectItems) selectItems.value = newValue;
  }
}

customElements.define("navigation-items", NavigationItems);
