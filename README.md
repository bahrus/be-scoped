# be-scoped

Create an EventTarget associated with the adorned element that can hold scoped state.

```html
<div id="scoped" be-scoped='{"count": 30}'></div>
```

...results in:

```JavaScript
console.log(scoped.beEnhanced.beScoped.scope.count === 30)
//true
```

To subscribe to changes to the scope:

```JavaScript
await customElements.whenDefined('be-enhanced');
const beScoped = await scoped.beEnhanced.whenResolved('be-scoped');
beScoped.scope.addEventListener('count', e => {
    console.log(e.detail);
});
```

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