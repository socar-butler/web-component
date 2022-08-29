# Slot

> `<slot>` 태그는 웹 컴포넌트 내 특정 영역의 마크업을 외부로 부터 주입 받기 위해 사용되는 태그 입니다.

- Dialog 컴포넌트와 같이 내부의 마크업이 외부로 부터 결정되는 컴포넌트를 개발하기 위해 사용 할 수 있습니다.

```javascript
customElements.define(
  "custom-slot",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
          #container {
            padding: 20px 10px;
            background-color: skyblue;
          }
        </style>

        <div id="container">
          <slot></slot>
        </div>
      `;
    }
  }
);
```

```html
...
<custom-slot>
  <p>Slotted</p>
</custom-slot>
...
```

[Sample](https://socar-butler.github.io/slot-sample.html)

## `<slot>`이 여러개 있다면?

- `<slot>`은 `name` attribute를 통해 식별할 수 있습니다.
- `<slot>` 태그에 `name` attribute가 설정되어 있다면 외부에서 대상 `<slot>`을 식별 할 수 있도록 slot attribute를 통해 반드시 대상 <slot>의 name을 입력해야 합니다.

```javascript
customElements.define(
  "custom-slot",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
          #container {
            padding: 20px 10px;
            background-color: skyblue;
          }
        </style>

        <div id="container">
          <slot name="first-slot"></slot>
          <slot name="second-slot"></slot>
        </div>
      `;
    }
  }
);
```

```html
...
<custom-slot>
  <p>Slotted</p>
  <!-- 화면에 출력되지 않음 -->
  <p slot="second-slot">Second Slotted</p>
  <!-- 화면에 출력됨 -->
  <p slot="first-slot">First Slotted</p>
  <!-- 화면에 출력됨 -->
</custom-slot>
...
```

[Sample](https://socar-butler.github.io/multiple-slot-sample.html)

> `<custom-slot>` 사이에 추가된 엘리먼트의 순서와 상관 없이 `name` attribute를 통해 대상 `slot`을 찾아 가기 때문에 실제 화면에 출력되는 결과물은 `First Slotted` -> `Second Slotted` 순이 됩니다.

## Styling

- `<slot>` 태그를 통해 외부에서 주입 받은 엘리먼트에 대한 스타일을 정의하기 위해 `::slotted` pseudo-elements를 사용합니다.
- `::slotted`를 이용한 CSS는 반드시 shadow DOM 내부에 정의해야 합니다.
- 이렇게 정의된 selector는 text node를 제외한 <slot> 내부의 모든 엘리먼트를 대상으로 합니다.

```javascript
customElements.define(
  "custom-slot",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
          #container {
            padding: 20px 10px;
            background-color: skyblue;
          }
          ::slotted(*) {
            font-size: 20px;
          }
          ::slotted([slot=first-slot]) {
            color: tomato;
          }
          ::slotted([slot=second-slot]) {
            color: green;
          }
        </style>

        <div id="container">
          <slot name="first-slot"></slot>
          <slot name="second-slot"></slot>
        </div>
      `;
    }
  }
);
```

[Sample](https://socar-butler.github.io/slot-stylingØ.html)
