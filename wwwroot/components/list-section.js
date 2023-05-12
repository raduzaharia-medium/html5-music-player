import { ListSectionHeader } from "list-section/header";
import { ListSectionSkeleton } from "list-section/list-section-skeleton";

export class ListSection extends HTMLElement {
  static get observedAttributes() {
    return ["singular", "plural", "order", "count", "filter", "value"];
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
  get count() {
    return this.getAttribute("count");
  }
  get filter() {
    return this.getAttribute("filter");
  }
  get value() {
    return this.getAttribute("value");
  }
  get itemType() {
    return this.getAttribute("item-type");
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
  set count(newValue) {
    this.setAttribute("count", newValue);
  }
  set filter(newValue) {
    this.setAttribute("filter", newValue);
  }
  set value(newValue) {
    this.setAttribute("value", newValue);
  }

  addItem(item) {
    const template = this.querySelector("template");
    const templateNode = template.content.firstElementChild;
    const node = templateNode.cloneNode(true);
    const listItem = node.querySelector(this.itemType);
    const ul = this.querySelector("ul");

    ul.appendChild(node);

    listItem.data = item;
  }
  setItems(items) {
    this.clearItems();

    if (items) {
      this.count = items.length;
      for (const element of items) this.addItem(element);
    }
  }
  clearItems() {
    this.value = "";
    for (const element of this.querySelectorAll("li")) element.remove();
  }

  connectedCallback() {
    this.innerHTML = `
      <list-section-header singular="${this.singular}" plural=${this.plural} 
        order=${this.order}></list-section-header>
      <input value="${this.filter || ""}" type="text" placeholder="search...">

      <ul>
        <template slot="item">
          <li><${this.itemType}></${this.itemType}></li>
        </template>
      </ul>
      
      <list-section-skeleton></list-section-skeleton>
    `;

    this.querySelector("input").addEventListener("keyup", () => {
      this.filter = this.querySelector("input").value;
    });

    this.querySelector("ul").addEventListener("click", (e) => {
      const selection = e.target.closest("li");

      if (selection) {
        this.selectedItem = selection.firstChild.dataset;
        this.value = selection.firstChild.dataset.item;
      }
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const header = this.querySelector("list-section-header");

    if (name === "count" && header) header.count = newValue;
    else if (name === "singular" && header) header.singular = newValue;
    else if (name === "plural" && header) header.plural = newValue;
    else if (name === "order" && header) header.order = newValue;
    else if (name === "filter") {
      this.querySelectorAll("li").forEach((element) => {
        if (element.firstChild.dataItemContains(newValue)) element.classList.remove("hidden");
        else element.classList.add("hidden");
      });
    } else if (name === "value") {
      if (oldValue) {
        const selection = this.querySelector(`[data-item="${oldValue}"]`);
        if (selection) selection.parentElement.classList.remove("selected");
      }
      if (newValue) {
        const selection = this.querySelector(`[data-item="${newValue}"]`);
        if (selection) selection.parentElement.classList.add("selected");
      }

      this.dispatchEvent(new Event("change"));
    }
  }

  selectNext() {
    const next = this.querySelector("li.selected").nextElementSibling;

    if (next) this.value = next.firstElementChild.dataset.item;
    else this.value = this.querySelector("li").firstElementChild.dataset.item;
  }
  selectPrevious() {
    const previous = this.querySelector("li.selected").previousElementSibling;

    if (previous.tagName !== "TEMPLATE") this.value = previous.firstElementChild.dataset.item;
    else this.value = this.querySelector("li:last-child").firstElementChild.dataset.item;
  }
}

customElements.define("list-section", ListSection);
