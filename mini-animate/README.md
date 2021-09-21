## react-router

前端路由的实现方式主要有两种，分别是 History 模式，和 Hash 模式。在 react-router 中它们分别对应BrowserRouter和HashRouter。不论哪种模式，要实现前端路由必须要满足核心的两点：  
1，修改 URL 的能力  
2，监听 URL 变动的能力

### History 模式

history 模式使用的是 H5 的 history API,主要有 pushState()和 replaceState()两个修改 URL 的方法，以及 popstate 事件用来监听地址发生改变的事件

```javascript
History.pushState(state, title [, url])
// 往历史堆栈的顶部添加一个状态，方法接收三个参数：一个状态对象, 一个标题, 和一个(可选的)URL
// 简单来说，pushState能更新当前 url，并且不引起页面刷新

History.replaceState(stateObj, title[, url]);
// 修改当前历史记录实体，方法入参同上
// 用法和 pushState类似，区别在于 pushState 是往页面栈顶新增一个记录，而 replaceState 则是修改当前记录

window.onpopstate
// 当活动历史记录条目更改时，将触发popstate事件
// 需要注意的是，pushState 和 replaceState 对 url 的修改都不会触发onpopstate，它只会在浏览器某些行为下触发, 比如点击后退、前进按钮、a标签点击等
```

###

### Hash 模式

Hash 模式最明显的特点是 URL 里面带有#号,通过 window.location.hash 和 onhashchange 进行 URL 的修改与监听。

```javascript
window.location.hash = "home";
// 修改url地址的hash值为home

window.onhashchange;
// 当url地址发生改变的时候会触发change事件
```

## react-router

在了解了上面两种路由模式的基本概念后，对于 react-router 的实现就能有了大致思路，它肯定也是在这个基础之上进行的实现。

#### BrowserRouter 和 HashRoute

先回到 BrowserRouter 和 HashRouter，它们是 react-router 的最顶层节点，在查看它们的代码后,可以发现它们二者都引用 history 这个第三方库，它可以在任何运行 JavaScript 的地方轻松管理会话历史记录。抹平了各种环境中的差异，并提供一个最小的 API，使您可以管理历史记录堆栈，导航和在会话之间保持状态。

```javascript
// react-router-dom/modules/BrowserRouter.js
class BrowserRouter extends React.Component {
  history = createHistory(this.props);

  render() {
    return <Router history={this.history} children={this.props.children} />;
  }
}

// react-router-dom/modules/HashRouter.js
class HashRouter extends React.Component {
  history = createHistory(this.props);

  render() {
    return <Router history={this.history} children={this.props.children} />;
  }
}
```

####

#### Router

history 的使用需要先通过 createHistory 来创建实例，通关这个实例我们可以拿到它提供的多种方法，比如 push, listen 等。其中 listen 方法可以用来监听 history 的变化，在 Router.js 中有了更为清晰的使用。在查看其中的实现过程后，可以看到当路由发生改变后，Router 会调用 setState 方法更新 location 对象，并通过 context 把对应的路由信息向下传递，更下一层级的组件拿到路由信息后的逻辑又是怎样的呢？

```javascript
// react-router/modules/Router.js
this.unlisten = props.history.listen((location) => {
  if (this._isMounted) {
    this.setState({ location });
  } else {
    this._pendingLocation = location;
  }
});

<RouterContext.Provider
  value={{
    history: this.props.history,
    location: this.state.location,
    match: Router.computeRootMatch(this.state.location.pathname),
    staticContext: this.props.staticContext,
  }}
>
  <HistoryContext.Provider
    children={this.props.children || null}
    value={this.props.history}
  />
</RouterContext.Provider>;
```

#### Route

在 Route 组件层级可以发现的，它的代码主要逻辑是通过 context 拿到 location 的信息后，会进行路由的匹配，这里是调用了 matchPath 方法（使用 path-to-regexp 第三方库）进行路由的匹配。并根据匹配的结果来控制页面的加载。

```javascript
// react-router/modules/Route.js
<RouterContext.Consumer>
  {(context) => {
    const location = this.props.location || context.location;
    const match =
      // ......
      matchPath(location.pathname, this.props);
    // ......

    return (
      <RouterContext.Provider value={props}>
        {props.match
          ? children
          : //...............
            null}
      </RouterContext.Provider>
    );
  }}
</RouterContext.Consumer>
```
