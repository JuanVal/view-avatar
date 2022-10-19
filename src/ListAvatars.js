import avatares from "./avatares.json";

class ListAvatars extends HTMLElement {
  title = "Avatars";
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
    this.renderAvatars();
  }
  render() {
    this.shadowRoot.innerHTML = /*html*/ `
      <style>${ListAvatars.styles}</style>
      <h2>${this.title}</h2>
      <section class="container-list"></section>
      <aside class="navegacion__paginacion">
        <button id="btnPrev" type="button">Previous</button>
        <strong>Page: </strong><span class="numero__pagina"></span>
        <button id="btnNext" type="button">Next</button>
      </aside>
    `;
  }
  async renderAvatars() {
    try {
      const $ = (selector) => this.shadowRoot.querySelector(selector);
      let current_page = 1;
      let obj_per_page = 10;
      const btn_next = $("#btnNext");
      const btn_prev = $("#btnPrev");
      const listing_table = $(".container-list");
      const page_span = $(".numero__pagina");

      function totNumPages() {
        return Math.ceil(avatares.data.length / obj_per_page);
      }

      function prevPage() {
        if (current_page > 1) {
          current_page--;
          change(current_page);
        }
      }
      function nextPage() {
        if (current_page < totNumPages()) {
          current_page++;
          change(current_page);
        }
      }

      function change(page) {
        if (page < 1) page = 1;
        if (page > totNumPages()) page = totNumPages();
        listing_table.innerHTML = "";
        for (let i = (page - 1) * obj_per_page; i < page * obj_per_page; i++) {
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
        page_span.innerHTML = page;
        if (page === 1) {
          btn_prev.style.visibility = "hidden";
        } else {
          btn_prev.style.visibility = "visible";
        }
        if (page === totNumPages()) {
          btn_next.style.visibility = "hidden";
        } else {
          btn_next.style.visibility = "visible";
        }
      }
      change(current_page);
      btn_next.addEventListener("click", () => nextPage());
      btn_prev.addEventListener("click", () => prevPage());
    } catch (error) {
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
        border: 5px solid white;
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
    `;
  }
  disconnectedCallback() {
    this.shadowRoot.innerHTML = "";
  }
}
customElements.define("list-avatars", ListAvatars);
