# WebStorm bug report

Template type checking bugs in `app.component.html`

## First bug

WebStorm erroneously reports `d.dataWithStatus` as a non-narrowed `(OkData & Foo) | ErroneousData`.

![img_4.png](img_4.png)

Compare with VS Code with the official Angular language service:

![img_2.png](img_2.png)

## Second bug

WebStorm erroneously adds the directive's context (or something), which causes `wrongType` to become an impossible `number & OkData`:

![img.png](img.png)

Compare with VS Code with the official Angular language service:

![img_3.png](img_3.png)

