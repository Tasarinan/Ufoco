# Coding Conventions

We are trying to follow eslint and `feross/Standard`.

## File Name

- File names should be concatenated with - instead of \_, e.g. file-name.js rather than file_name.js
- When the file(module) default exports one class, the file name default should same as class name and use CamelCase, but if the folder contains index.js,folder name should same as class name and use CamelCase.
- 文件名的开头是大写字母。我们遵循一个原则：如果一个文件导出的是一个类，那么这个文件名就用大写开头。四个组件类文件导出都是类，所以都是大写字母开头。

## Component

组件的私有方法都用 \_ 开头，所有事件监听的方法都用 handle 开头。把事件监听方法传给组件的时候，属性名用 on 开头。例如：

<CommentInput
  onSubmit={this.handleSubmitComment.bind(this)} />
这样统一规范处理事件命名会给我们带来语义化组件的好处，监听（on）CommentInput 的 Submit 事件，并且交给 this 去处理（handle）。这种规范在多人协作的时候也会非常方便。

另外，组件的内容编写顺序如下：

static 开头的类属性，如 defaultProps、propTypes。
构造函数，constructor。
getter/setter（还不了解的同学可以暂时忽略）。
组件生命周期。
\_ 开头的私有方法。
事件监听方法，handle*。
render*开头的方法，有时候 render() 方法里面的内容会分开到不同函数里面进行，这些函数都以 render\* 开头。
render() 方法。

## Syntax

Use newer ES6/ES2015 syntax where appropriate

- const for requires and other constants
- let for defining variables
- Arrow functions instead of function () { }
- Template literals instead of string concatenation using +
- Ref

All `ref` should be a call back and bind it to instance directly. So, it can be accessed without calling `refs`.

If the element is wrapped by styled components, it is needed to use `innerRef`.

Also, expressions of the callbacks should be like `c => (this.someName = c)` to prevent the error of eslint. `c` stands for `component`

```jsx
import { MarkdownEditor } from 'components'
const Root = styled.div`
  ...
`

  render () {
    return (
      <Root
        innerRef={c => (this.root = c)}
      >
        <MarkdownEditor
          ref={c => (this.editor = c)}
          value={this.state.content}
          onChange={this.handleContentChange}
        />
      </Root>
    )
  }
```

## Binding callback

It should be placed inside of a constructor.

```js
class SomeComponent {
  someHandler = e => {
    e.preventDefault()
    ...
  }
}
```

Wrong cases

```jsx
class SomeAnotherComponent {
  constructor (props) {
    super(props)

    // This is wrong JUST FOR NOW because React Hot Loader doesn't support.
    this.someHandler = e => {
      e.preventDefault()
      ...
    }
  }

  someAnotherHandler () {
    e.preventDefault()
    ...
  }

  render () {
    return <button
      onClick={this.someAnotherHandler.bind(this)}
      onContextMenu={e => this.someAnotherHandler}
    />
  }
}
```

## `ref` for Styled components

If you tried to use `ref` for styled component, you will get a instance of the component not the element object.
To access the root element of it, you have to access children array.

The library give another option `innerRef`. We use this instead of accessing children.

```jsx
const CustomButton = styled.button`
  font-size: 24px;
`;

class WrappedButton {
  someMethod() {
    this.button.focus();
  }

  render() {
    return <CustomButton innerRef={c => (this.button = c)} />;
  }
}
```
