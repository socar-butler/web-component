import { html, render } from "lit-html";
import "./components/count-button";

customElements.define(
  "lit-html-sample",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      render(
        html`
          <h1>Welcome to Lit HTML</h1>
          <count-button></count-button>
        `,
        this.shadowRoot!
      );
    }
  }
);
