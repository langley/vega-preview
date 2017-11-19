# vega-atom package

Render vega and vega-lite specs in [atom](https://atom.io/)


## Current features
* Valid vega-lite specs are displayed in the side panel, triggered by the 'ctrl-alt-z' keybinding.
* If ctrl-alt-z is triggered on a normal file a default plot is displayed with a title indicating it is invalid.

## Origin
* Started from the atom
  * _active-editor-info_ example atom package
  * _vega-desktop_ node package
* Used the loophole package to adjust atom's Content Security Policy for the required packages
