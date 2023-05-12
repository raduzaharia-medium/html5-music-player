export class ListSectionSkeleton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="loader-item">
        <div class="loader small-heading"></div>
      </div class="loader-item">

      <div class="loader-item">
        <div class="loader circle"></div>
        <div class="loader line"></div>
      </div>
      <div class="loader-item">
        <div class="loader circle"></div>
        <div class="loader line"></div>
      </div>
      <div class="loader-item">
        <div class="loader circle"></div>
        <div class="loader line"></div>
      </div>
      <div class="loader-item">
        <div class="loader circle"></div>
        <div class="loader line"></div>
      </div>
      <div class="loader-item">
        <div class="loader circle"></div>
        <div class="loader line"></div>
      </div>`;
  }
}

customElements.define("list-section-skeleton", ListSectionSkeleton);
