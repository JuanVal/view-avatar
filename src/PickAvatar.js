import "./ViewAvatar.js";
import avatares from "./avatares.json";
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
      <view-avatar avatar="${avatares.data[0].url}"></view-avatar>
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
      }
    `;
  }
}

customElements.define("pick-avatar", PickAvatar);
