# be-scoped (🎯) [TODO]

be-scoped is in the process of being resurrected, possibly.


```html
<table itemscope=my-list>
        <tr id=testRow 
        aria-rowindex=11   
        📌-idx="aria-rowindex"
        🎯="${my-list}?.[📌?.idx] to my-item"
    >
    </tr>
</table>
```

What this does:

1.  Grabs the list from oTable.ishList
2.  From the list in step 1, extract the 11th element (since aria-rowindex=11)
3.  Instantiate or merge list item into existing my-item custom element, attached to ish property



