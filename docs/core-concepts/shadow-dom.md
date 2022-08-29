# Shadow DOM

## What's `Shadow DOM`?

- 웹 컴포넌트로 제작된 커스텀 엘리먼트는 `Shadow DOM` 영역에 존재합니다
  - 웹 컴포넌트의 Core concept중 하나는 캡슐화로 마크업의 구조, 스타일, 동작을 숨깁니다.
  - `Shadow DOM`이라는 별도의 영역을 지정하는 것을 통해 캡슐화가 가능합니다.

## Shadow DOM의 구성 및 용어정리

![Shadow DOM](./shadowdom.svg)

- Shadow root
  - Shadow root는 Shadow tree의 관점에서 바라본 root 노드를 의미
- Shadow host
  - Shadow host는 Document tree의 관점에서 바라본 Shadow tree의 root 노드를 의미
- Shadow tree
  - Shadow tree는 Document tree와 상응하는 개념으로 Shadow root를 포함한 모든 하위 노드의 트리를 의미
- Shadow boundary
  - Shadow boundary는 Shadow DOM과 Document tree의 경계를 의미

## API

### Element.attachShadow

엘리먼트 내부에 `shadowRoot`를 삽입 합니다.

> 모든 엘리먼트에 Shadow DOM을 삽입 할 수 있을까?
>
> 보안상의 이유로 일부 엘리먼트에는 shadow dom을 삽입 할 수 없다. (ex. anchor) shadow dom을 삽입 할 수 있는 엘리먼트는 커스텀 엘리먼트와 article, aside, blockquote, body, div, footer, h1~h6, header, main, nav, p, section, span이 있다.

### Closed/Open mode `shadowRoot`

`Shadow DOM`은 두가지 모드를 가지고 있습니다.

- open mode
  - javascript를 통해 `shadowRoot`에 접근이 가능한 형태 입니다.
- close mode
  - javascript를 통해 `shadowRoot`에 접근 할 수 없는 형태 입니다.

> 일반적으로 `Open` mode를 통해 커스텀 엘리먼트를 만듭니다.
> 필요에 따라 내부 로직을 숨기기 위해 `Close` 모드로 커스텀 엘리먼트를 만들 수 있지만 사용자 (개발자)가 할 수 있는 일을 심대하게 제약하기 때문에 불필요 합니다.
>
> 더불어 우회적으로 `shadowRoot`에 접근할 수 있는 방법은 여전히 존재 합니다.

### delegatesFocus

- 중첩된 shadow dom 중 상위 요소를 클릭 했을 때 focus가 대체될 대상 shadow dom을 생성하기 위해 delegatesFocus 속성을 사용합니다.

```javascript
document.body.attachShadow({ mode: "open" });

const shadowRoot = document.body.shadowRoot;
shadowRoot.innerHTML = `
  <style>
    div {
      padding: 20px;
      background-color: tomato;
    }
  </style>
  <div></div>
`;
const div = shadowRoot.querySelector("div");
const focusableInput = div.attachShadow({
  mode: "open",
  delegatesFocus: true,
});
focusableInput.innerHTML = `<input placeholder="focusable" />`;
```

## Event 전파 - Composed

- 커스텀 엘리먼트 내부에서 발생하는 *커스텀 이벤트*는 `Shadow Root`를 지나 외부로 전파 될수 없습니다.
- `click`, `touch`, `mouseover`와 같은 UI 이벤트는 전파 가능 합니다.
- `Event` 객체가 가지고 있는 `composed` 속성에 의해 전파 가능 여부가 결정 됩니다.
- 다시말해 UI 이벤트는 기본적으로 `composed`가 true로 *커스텀 이벤트*는 false로 설정되어 있습니다.
- *커스텀 이벤트*를 발생시킬 때 `composed` 속성을 true로 준다면 이벤트 버블링을 발생 시킬 수 있습니다.

```javascript
shadowElement.dispatchEvent(new CustomEvent('butler-custom-event', {
  bubbles: true,
  composed: true
})
```

> 그럼 Capturing은?
>
> Event capturing은 shadow DOM에서 상위 엘리멘트로의 이벤트 전파가 아니기 때문에 shadow DOM의 존재 유무와 관계 없이 일반적인 형태로 흐르게 됩니다.
