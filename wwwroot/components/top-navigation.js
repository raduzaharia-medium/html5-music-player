import { NavigationItems } from "top-navigation/navigation-items";
import { NavigationSelection } from "top-navigation/navigation-selection";

export class TopNavigation extends HTMLElement {
  static get observedAttributes() {
    return ["value", "items", "selection"];
  }

  get items() {
    return this.getAttribute("items");
  }
  get value() {
    return this.getAttribute("value");
  }
  get selection() {
    return this.getAttribute("selection");
  }

  set items(newValue) {
    this.setAttribute("items", newValue);
  }
  set value(newValue) {
    this.setAttribute("value", newValue);
  }
  set selection(newValue) {
    this.setAttribute("selection", newValue);
  }

  connectedCallback() {
    this.innerHTML = `
      <navigation-items items="${this.items}" value="${this.value}"></navigation-items>
      <navigation-selection value="${this.selection}"></navigation-selection>`;

    this.querySelector("navigation-items").addEventListener("change", () => {
      this.value = this.querySelector("navigation-items").value;
      this.dispatchEvent(new Event("change"));
    });

    this.querySelector("navigation-selection").addEventListener("change", () => {
      this.selection = this.querySelector("navigation-selection").value;
      this.dispatchEvent(new Event("change"));
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const navigationItems = this.querySelector("navigation-items");
    const navigationSelection = this.querySelector("navigation-selection");

    if (name === "items" && navigationItems) navigationItems.items = newValue;
    else if (name === "value" && navigationItems) navigationItems.value = newValue;
    else if (name === "selection" && navigationSelection) navigationSelection.value = newValue;
  }
}

customElements.define("top-navigation", TopNavigation);
