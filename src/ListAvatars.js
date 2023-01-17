import avatares from "./avatares.json";

class ListAvatars extends HTMLElement {
  title = "Avatars";
  $ = (selector) => this.shadowRoot.querySelector(selector);
 
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    obj_per_page = 10;
    current_page = 1;
    btn_next = this.$("#btnNext");
    btn_prev =  this.$("#btnPrev");
  }
  connectedCallback() {
    this.render();
    this.renderAvatars();
  }
  render() {
    try{
      this.shadowRoot.innerHTML = /*html*/ `
      <style>${ListAvatars.styles}</style>
      <h2>${this.title}</h2>
      <section class="container-list"></section>
      <aside class="navegacion__paginacion">
        <button id="btnPrev" type="button">Previous</button>
        <strong class="page">Page</strong><span class="numero__pagina"></span>
        <button id="btnNext" type="button">Next</button>
      </aside>
    `;
    }catch(error){
      this.shadowRoot.innerHTML =/*HTML*/ `${error.message}`;
    }
  }
 
 renderAvatars() {
    try {
      
      
      
      this.changePage(this.current_page);

      this.btn_next.addEventListener("click", this.nextPage.bind(this));
      this.btn_prev.addEventListener("click", this.prevPage.bind(this));
    } catch (error) {
      this.shadowRoot.innerHTML += /*html*/ `<pre>${error.message}</pre>`;
    }
  }
  prevPage() {
    try {
      if (this.current_page > 1) {
        this.current_page--;
        this.changePage(this.current_page);
      }
    } catch (error) {
      this.shadowRoot.innerHTML += /*html*/ `<pre>${error.message}</pre>`;
    }
  }
  nextPage() {
    try {
      if (this.current_page < this.totNumPages()) {
        this.current_page++;
        this.changePage(this.current_page);
      }
    } catch (error) {
      this.shadowRoot.innerHTML += /*html*/ `<pre>${error.message}</pre>`;
    }
  }
  totNumPages() {
   try{
      return Math.ceil(avatares.data.length /  this.obj_per_page);
   }catch(error){
     this.shadowRoot.innerHTML = /*HTML*/ `${error.message}`;
   }
  }
  changePage(page) {
   try{
    const listing_table =  this.$(".container-list");
    
    if (page < 1) page = 1;
    if (page > this.totNumPages()) page = this.totNumPages();
    listing_table.innerHTML = "";
    for (let i = (page - 1) * this.obj_per_page; i < page * this.obj_per_page; i++) {
      if (avatares.data[i]) {
        listing_table.innerHTML += /*html*/ `
        <img class="avatar" src=${avatares.data[i].url} alt="" width="48"/>
      `;
      }
    }

    const allAvatars = listing_table.querySelectorAll(".avatar");
    allAvatars.forEach((element) => {
      element.addEventListener("click", (e) => {
        e.target.dispatchEvent(
          new CustomEvent("pick-avatar", {
            bubbles: true,
            composed: true,
            detail: {
              url: e.target.src,
            },
          })
        );
      });
    });

    const page_span =  this.$(".numero__pagina");
    const btn_next = this.$("#btnNext");
    const btn_prev =  this.$("#btnPrev");

    page_span.innerHTML = page;
    if (page === 1) {
      this.btn_prev.style.visibility = "hidden";
    } else {
      this.btn_prev.style.visibility = "visible";
    }
    if (page === this.totNumPages()) {
      this.btn_next.style.visibility = "hidden";
    } else {
      this.btn_next.style.visibility = "visible";
    }
   }catch(error){
     this.shadowRoot.innerHTML += /*html*/ `<pre>${error.message}</pre>`;
   }
  }
  static get styles() {
    return /*css*/ `
    :host{
        display: grid;
       
    }
      .container-list{
        display: grid;
        grid-template-columns: repeat(5,minmax(min(100%, 1em), 3em));
        justify-content: center;
        align-items: start;
        gap: 1rem 3px;
        padding: 1rem;
        border-radius: 8px;
        min-height: 10em;
      }
      h2{
        text-align: center;
      }
      img{
        object-fit: cover;
      }
      .navegacion__paginacion{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem;
        border: 1px solid white;
        border-radius: 6px;
        margin: 0 1rem;
      }
      .avatar{
        cursor: pointer;
      }
      .avatar:hover {
        transition: transform .6s ease;
        transform-origin: center;
        transform: rotate(360deg)
      }
      .page{
        color: orange;
        font-weight: 800;
      }
      .numero__pagina{
     
        font-weight: 800;
      }
      button{
        padding: .2em;
        font-weight: 800;
        color: skyblue;
        background-color: whitesmoke;
        border: 1px solid skyblue;
        cursor: pointer;
      }
      button:hover{
        color: white;
        background-color: skyblue;
        border: 1px solid gray;
      }
    `;
  }
  disconnectedCallback() {
    this.shadowRoot.innerHTML = "";
  }
}
customElements.define("list-avatars", ListAvatars);
