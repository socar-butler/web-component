import { html, render as renderHtml } from "lit-html";

customElements.define(
  "count-button",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    count: number = 0;

    connectedCallback() {
      this.render();
    }

    increment() {
      this.count++;
      this.render();
    }

    render() {
      renderHtml(
        html`
          <span>${this.count}</span>
          <button @click=${this.increment.bind(this)}>+</button>
        `,
        this.shadowRoot!
      );
    }
  }
);
