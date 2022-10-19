class ViewAvatar extends HTMLElement {
  title = "Display Avatar";
  avatar = "";
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
    this.avatar = this.getAttribute("avatar");
  }
  attributeChangedCallback(attr, old, now) {
    if (attr === "avatar") {
      this.avatar = now;
    }
  }
  static get observedAttributes() {
    return ["avatar"];
  }
  render() {
    this.shadowRoot.innerHTML = /*html*/ `
      <style>${ViewAvatar.styles}</style>
     
       <img src="${this.avatar}" alt="Selected avatar" width="120">
        <h2>${this.title}</h2>
    
    `;
  }

  static get styles() {
    return /*css*/ `
      h2{text-align: center;}
      :host{
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 2px solid gray;
        gap: 1rem;
        padding: 2rem;
      }
    `;
  }
}
customElements.define("view-avatar", ViewAvatar);
