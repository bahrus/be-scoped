# be-scoped [TODO]

Sometimes when we are generating a loop of HTML on the server or on the client, we need a convenient place to hold the view model responsible for 
managing the view model or state for each HTML section of the loop.

One way this can be done is with an extremely light-weight rendering from the looping code (again, either on the server or the client) -- just rendering a single tag of a custom element for each iteration of the loop, and passing in the data for the view model, and let the custom element take care of the rest:

```JavaScript
${myList.map(item => html`
    <my-item .vm=${item}></my-item>
`)}
```

Now our custom element can go in one of two ways:  It can use Shadow DOM or not use Shadow DOM.  If using Shadow DOM, the division of labor between the looping code and the custom element is pretty clear -- the looping code is expected to generate any light children, if applicable.  The custom element generates all the content inside the ShadowRoot, and takes a hands-off approach towards the light children.

Things become much more ambiguous if no ShadowDOM is used.  In my view, if the custom element chooses to generate its own children, that should work fine so long as the "framework" takes a "mind your own business, and don't do unnecessary work" approch to rendering.  The code snippet above, which uses the "framework built into the browser" would certainly do that.  It's unclear to me how uniformly that fundamental tenet is adhered to with modern frameworks.  In the past, during the heyday of VDOM hype, I would see instances where the framework would appear to go through the thought process:  "hey, I didn't generate those child elements, how dare anything give birth to elements I didn't give permission to? I am going to blow that all away" on a re-render.  I can't vouch for what the latest state of the art browsers do, just be forwarned.

Anyway, for the scenarios listed above, this custom enhancement doesn't add any value.

Where this enhancement may help is with another approach to looping.  Let's consider first a scenario where we are almost forced to adopt an alternative:  Where the looping code is generating rows (tr elements) of the HTMLTable element:

```JavaScript
html`
<table>
    <thead><th>Name</th><th>SSN Number</thead>
    <tbody>
${myList.map(item => html`
    <tr>
        <td>${item.name}</td>
        <td>${item.ssn}</td>
    </tr>
`)}
    </tbody>
</table>
`
```

While the example above so far poses no issues, we start to immediately get a sense of unease the moment we need to start performing intimate actions on individual rows / items of the view model.  How do we get access to the view model item associated with the row?  We start inventing ways to handle this, with id's, lots of ugly look ups, etc.  So we could have the fleeting thought "Hey, why don't I create a web component to contain each row, that can encapsulate the view model for each item of the list"? but of course the HTML decorum for tables doesn't allow us to do that.

I would venture that this problem space accounts for part of the appeal that frameworks bring to the table, beyond what can be handled by custom elements alone, thus causing framework "lock-in," due to there not being an interoperable solution to this problem.

Initially, this enhancement was designed to solve that problem, by providing access to that view model via the custom enhancement protocol:

oTR.beEnhanced.beScoped.scope

But that approach felt kind of clunky to me.

In addition, this doesn't provide a clean way for developers to add their own custom logic as needed into the view model, like they can do with custom elements.

So the new approach this enhancement takes, in conjunction with recent enhancements to the [DSS](https://github.com/bahrus/trans-render/wiki/VIII.--Directed-Scoped-Specifiers-(DSS)#what-do-we-mean-by-hostish), is to do the following:

We push the standard HTML voculabulary a tad in order to be as transparent as possible what is happening, stretching the boolean itemscope attribute a little beyond it's recognized platform role:

```JavaScript
html`
<table>
    <thead><th>Name</th><th>SSN Number</thead>
    <tbody>
${myList.map(item => html`
    <tr itemscope=my-item>
        <td>
            <my-item .item=${item}
            ${item.name}
        </td>
        <td>${item.ssn}</td>
`)}
    </tbody>
</table>
`
```

So then if the libraries we work with have an easy-to-reproduce-in-any-framework "virtual host" getter that includes logic like this:

```JavaScript
function getHostish(el: Element){
    const closestItemScope = el.closest('itemscope');
    if(closestItemScope !== null){
        if(closestItemScope.localName.indexOf('-')){
            //it's a custom element so this is probably our host
            return closestItemScope;
        }
        const attr = closestItemScope.getAttribute('itemscope');
        return closestItemScope.querySelector(attr);
    }
    //get shadow root host
    return el.getRootNode().host;
}
```

then anywhere we would want to do:  el.getRootNode().host we instead call the function above, then we can work with any combination of solution -- with ShadowDOM, without ShadowDOM, without the ability to contain each item.

Having established this protocol by necessity, we can then go back to other scenarios where HTML decorum would allow for Shadowless containers, but with the ambiguity of responsibility issue listed above, and use a non visual view model custom element as our general solution.



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
