# vega-preview package

Render vega-lite specs in [atom](https://atom.io/)


## Current Features
* Valid vega-lite specs are displayed in the side panel, triggered by the 'ctrl-alt-z' keybinding.
* If ctrl-alt-z is triggered on a "non" vega-spec file a blank "page" is rendered.
* data can come from a local data file and can be specified via a relative file://url. See the examples in the data directory.

## Origin
* Started from the atom
  * _active-editor-info_ example atom package
  * _vega-desktop_ node package
* Used the loophole package to adjust atom's Content Security Policy for the required packages
