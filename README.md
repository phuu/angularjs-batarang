# Flight Batarang

This is totally non-functional barebones stuff. Don't expect much yet.

## Installing from Source

1.  Clone the repository: `git clone git://github.com/phuu/flight-batarang`
2.  Navigate to `chrome://chrome/extensions/` and enable Developer Mode.
3.  Choose "Load unpacked extension"
4.  Open the directory you just cloned (should open with Chrome, otherwise try dragging/dropping the file into Chrome) and follow the prompts to install.

## Notes

Random thoughts and bits.

### Planned Features

- inspect loaded components & associated DOM
- inspect + modify state of loaded components
- dependency graphs and mixin use visualisation
- performance inspection
- event flow tracking

& more...

### Event tracking

This kind of logging might be nice for tracking event from. Could get unweildy with large numbers of events...

```javascript
console.group('theMainComponent trigger uiNeedsSomething');

  var data = { isTasty: Boolean('yes') };

  console.log('with', data);

  console.group('someComponent on uiNeedsSomething');

    console.log(new Event('someEvent'));
    console.log(data);

  console.groupEnd();

  console.group('someOtherComponent on uiNeedsSomething');

    console.log(new Event('someEvent'));
    console.log(data);

  console.groupEnd();

console.groupEnd();
```

## Introspecting

In an AMD page, the following snippet gets access to the Flight registry which already contains a fair bit of useful introspection data.

```
require(['flight/lib/registry'], function (registry) { window.registry = registry; })
```
