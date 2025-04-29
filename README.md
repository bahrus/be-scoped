# be-scoped (🎯) [TODO]

be-scoped is in the process of being resurrected, possibly.


```html
<table itemscope=national-medal-list>
    <caption>Medal List Summer 2024</caption>
    <thead>
        <tr>
            <th></th>
            <th>Rank</th>
            <th>NOC</th>
            <th>Gold</th>
            <th>Silver</th>
            <th>Bronze</th>
            <th>Total</th>
        </tr>
    </thead>
    <tbody>
        <template 
            per-each="country-medal-count of national-medal-list"
            per-each-map-idx-to="idx"
            per-each-idx-start="1"
        >
            <tr -s=aria-rowindex>
                <td><plus-minus></plus-minus></td>
                <td itemprop=rank></td>
                <td itemprop=noc></td>
                <td itemprop=gold></td>
                <td itemprop=silver></td>
                <td itemprop=bronze></td>
                <td><span itemprop=total></span> of <span -o=totalMedalCount></span></td>
            </tr>
            <template 🎚️="on when isExpanded">
                <tr be-scoped-into="country-medal-count and national-medal-list">
                    <td colspan=7>
                        <medal-ment></medal-ment>
                    </td>
                </tr>
            </template>

        </template>
    </tbody>
</table>
```

" and " is optional

What this does:

"Attaches itself" into the "ish" view models that are attached to the table and tr elements:

```JavaScript

if(oTR.ish === undefined) oTR.ish = {};
if(oTR.ish.scopedPeers === undefined) oTR.ish.scopedPeers = new Set();
oTR.ish.scopedPeers.add(new WeakRef($0));
```



