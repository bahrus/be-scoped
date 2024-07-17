# be-scoped [TODO]

Sometimes when we are generating a loop of HTML on the server or on the client, we need a convenient place to hold the view model responsible for 
managing the view model or state for each HTML section of the loop.

One way this can be done is with an extremely light-weight rendering from the looping code (again, either on the server or the client) -- just rendering a single tag of a custom element, and passing in the data for the view model, and let the custom element take care of the rest:

```JavaScript
${myList.map(item => html`
    <my-item .vm=${item}></my-item>
`)}
```

```html
<script id=my-fns nomodule>
    export const myFirstFn = (scope, e) => {
        console.log({scope, e});
    }
</script>
...
<div itemscope=💰 id="scoped" 💰='{"count": 30}' 💰-fns="my-fns">
    <span itemprop=count></span>
    <input type=number 🛗 name=count>
    <button 🕹️=myFirstFn>Invoke myFirstFn</button>
</div>
```

...results in:

```JavaScript
console.log(scoped.💰.count === 30)
//true
```

If scope.💰 is undefined, it's fine to start setting values into it.  They will be absorbed into the scope object when it attaches.

To subscribe to changes to the scope:

```JavaScript
scoped.addEventListener.addEventListener('💰.count', e => {
    console.log(e.detail.💰);
});
```

## Adorning a custom element

If the desire is to add "scoping" to a custom element, use [be-propagating](https://github.com/bahrus/be-propagating) instead.

[![Playwright Tests](https://github.com/bahrus/be-scoped/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-scoped/actions/workflows/CI.yml)
[![NPM version](https://badge.fury.io/js/be-scoped.png)](http://badge.fury.io/js/be-scoped)

Size of package, including custom element behavior framework (be-enhanced/be-hive):

[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-scoped?style=for-the-badge)](https://bundlephobia.com/result?p=be-scoped)

Size of new code in this package:

<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-scoped?compression=gzip">

## Viewing Locally

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:3030/demo/ in a modern browser.

## Importing in ES Modules:

```JavaScript
import 'be-exportable/be-scoped.js';
```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-scoped';
</script>
```
