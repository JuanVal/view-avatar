class ViewAvatar extends HTMLElement {
  title = "Display Avatar";
  avatar = "";
  activateanimation = false;
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
    if (attr === "activateAnimation") {
      if (now === "false") this.activateanimation = false;
      if (now === "true") this.activateanimation = true;
      console.log(this.activateanimation);
    }
  }
  static get observedAttributes() {
    return ["avatar", "activateanimation"];
  }
  render() {
    this.shadowRoot.innerHTML = /*html*/ `
      <style>${ViewAvatar.styles}</style> 
        
        <img class="${
          !this.activateanimation ? "avatar " : "avatar activated"
        }" src="${this.avatar}" alt="Selected avatar" width="120">
        <h2>${this.title} ${this.activateanimation}</h2>
        <button class="click__animate">Animate</button>
    
    `;
    this.shadowRoot
      .querySelector(".click__animate")
      .addEventListener("click", () => {
        this.shadowRoot.querySelector(".avatar").classList.toggle("activated");
      });
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
      .avatar{
        transform: translateY(-12px);
      }
      .activated{
        animation: flotar 1s alternate infinite;
      }
      @keyframes flotar {
        0% {
          transform: translateY(-24px);
          animation-timing-function: ease-in;
          opacity: 1;
        }
       
       
        100% {
          transform: translateY(-20px);
          animation-timing-function: ease-out;
          opacity: 1;
        }
      }
    `;
  }
}
customElements.define("view-avatar", ViewAvatar);
