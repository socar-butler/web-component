# Custom Element

## Register custom element

```javascript
window.customElements.define("custom-element", CustomElement);

// or

window.customElements.define("custom-element", CustomElement, {
  extends: "form",
});
```

## Life cycle

- constructor
  - 커스텀 엘리먼트의 인스턴스가 생성될 때마다 호출 됩니다.
- connectedCallback
  - 커스텀 엘리먼트가 document에 추가될 때마다 호출 됩니다.
- disconnectedCallback
  - 커스텀 엘리먼트가 document에서 제거 될 때마다 호출 됩니다.
- adoptedCallback
  - 커스텀 엘리먼트가 새로운 document로 이동할 때마다 호출 됩니다.
- attributeChangedCallback
  - 커스텀 엘리먼트의 attribute가 변화할 때 마다 호출 됩니다.

## 상속으로 만드는 커스텀 엘리먼트

```javascript
class CustomForm extends HTMLFormElement {
  serialize() {
    const elements = Array.from(this.querySelectorAll("input,select,textarea"));
    if (elements.some((element) => !element.name)) {
      throw new Error("Failed to find field name");
    }

    let result = {};

    elements.forEach(({ name, type, value, checked }) => {
      switch (type) {
        case "number":
          result[name] = Number(value);
          break;

        case "checkbox":
          result[name] = checked;
          break;

        default:
          result[name] = value;
      }
    });

    return result;
  }
}

window.customElements.define("custom-form", CustomForm, { extends: "form" });
```

```html
...
<form id="custom-form" is="custom-form">
  <input type="text" name="text" />
  <input type="number" name="number" />
  <input type="date" name="date" />
  <input type="checkbox" name="checkbox" />
  <textarea name="textarea"></textarea>
  <select name="option">
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </select>
</form>

...

<script>
  const formData = document.querySelector("#custom-form").serialize();
  console.log(formData);
</script>
...
```

[Sample](https://socar-butler.github.io/custom-form.html)