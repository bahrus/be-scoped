# be-scoped (🎯)

NB:  Unclear if this provides value-add at this point...


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
            <template be-switched="on when ^({tr})~plusMinus?.isExpanded">
                <tr be-scoped="national-medal-list">
                    <td colspan=7>
                        <medal-ment></medal-ment>
                    </td>
                </tr>
            </template>

        </template>
    </tbody>
</table>
```


What this does:

"Attaches itself" into the "ish" view models that are attached (by mount-observer) to the table and tr elements:

```JavaScript
if(!$0.id){
    $0.id = 'be-scoped-' + counter++;
    oTR.itemRef += ' ' + $0.id;
}
```



