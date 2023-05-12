export class AudioPlayer extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
  }

  get src() {
    return this.getAttribute("src");
  }
  set src(newValue) {
    this.setAttribute("src", newValue);
  }

  connectedCallback() {
    this.innerHTML = `
      <progress id="progress" class="progress-indicator" min="0" max="1" value="0"></progress>
      
      <div></div>
      <div></div>
      <div>
        <img class="media-control secondary previous" id="previous" src="/images/dark/button-previous.svg" />
        <img class="media-control primary play" id="play" src="/images/dark/button-play.svg" />
        <img class="media-control primary pause hidden" id="pause" src="/images/dark/button-pause.svg" />
        <img class="media-control secondary next" id="next" src="/images/dark/button-next.svg" />
      </div>
      <div>
        <img class="media-control secondary repeat" id="repeat" src="/images/dark/button-repeat.svg" />
      </div>

      <audio id="player" autoplay></audio>
    `;

    this.querySelector("#play").addEventListener("click", () => {
      this.querySelector("audio").play();
      this.querySelector("#play").classList.add("hidden");
      this.querySelector("#pause").classList.remove("hidden");
      this.querySelector("#pause").classList.add("selected");
    });

    this.querySelector("audio").addEventListener("timeupdate", () => {
      const player = this.querySelector("audio");
      if (player.currentTime > 0) this.querySelector("#progress").value = player.currentTime / player.duration;
    });

    this.querySelector("#pause").addEventListener("click", () => {
      this.querySelector("audio").pause();
      this.querySelector("#play").classList.add("selected");
      this.querySelector("#play").classList.remove("hidden");
      this.querySelector("#pause").classList.add("hidden");
    });

    this.querySelector("#next").addEventListener("click", () => {
      this.dispatchEvent(new Event("next"));
    });

    this.querySelector("#previous").addEventListener("click", () => {
      this.dispatchEvent(new Event("previous"));
    });

    this.querySelector("#repeat").addEventListener("click", () => {
      this.querySelector("audio").loop = !this.querySelector("audio").loop;
      this.querySelector("#repeat").classList.toggle("selected");
    });

    this.querySelector("audio").addEventListener("ended", () => {
      this.dispatchEvent(new Event("end"));
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.querySelector("audio").src = newValue;

    if (name === "src") {
      this.querySelector("#play").classList.add("hidden");
      this.querySelector("#pause").classList.remove("hidden");
      this.querySelector("#pause").classList.add("selected");

      this.dispatchEvent(new Event("change"));
    }
  }

  setPlaylist(playlist) {
    this.playlist = playlist;
  }
}

customElements.define("audio-player", AudioPlayer);
