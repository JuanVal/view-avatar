import "./ViewAvatar.js";

class PickAvatar extends HTMLElement {
  avatarUrl = "";
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.addEventListener("pick-avatar", this.getSelectedAvatar.bind(this));
  }

  connectedCallback() {
    this.render();
  }
  render() {
    this.shadowRoot.innerHTML = [];
    this.shadowRoot.innerHTML = /*html*/ `
      <style>${PickAvatar.styles}</style>
      <slot></slot>
      <view-avatar activateanimation="false" ></view-avatar>
    `;
  }
  getSelectedAvatar(event) {
    this.shadowRoot.innerHTML = [];
    this.shadowRoot.innerHTML += /*html*/ `
     <style>${PickAvatar.styles}</style>
    <slot></slot>
    <view-avatar avatar="${event.detail.url}"></view-avatar>
    `;
    this.avatarUrl = event.detail.url;
  }
  static get styles() {
    return /*css*/ `
      :host{
        display: grid;
        gap: 1rem;
        padding: 2rem;
        max-width: 375px;
        padding: 1rem;
        margin: 20px auto;
        background-color: #DDE;
        border: 1px solid white;
        border-radius: 4px;
        box-shadow: 2px 2px 3px 1px #3339;
      }
    `;
  }
}

customElements.define("pick-avatar", PickAvatar);
