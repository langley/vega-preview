# vega-preview package

Render vega and vega-lite specs in [atom](https://atom.io/)


## Current Features
* Valid vega and vega-lite specs are displayed in the side panel, triggered by the 'ctrl-shift-v' keybinding.
* If ctrl-shift-v is triggered on a "non" vega-spec file a blank "tab" is rendered.
* data can come from a local data file and can be specified via a relative file://url. See the examples in the data directory.

## Updated Features
* Fixed the "relative data url" behavior so that it should work regardless
  of where the spec and data files are. The location is defined in terms of the location of spec file. For example:
     _"data": {"url": "file://./stocks.csv", "format": {"type": "csv"}}_
  will load data from the stocks.csv file located in the same directory as the vega-lite spec that contains it. (See the specs and data in _examples_ directory of the project.)


## Origin
* The [markdown](https://atom.io/packages/markdown-preview) and [ascidoc](https://atom.io/packages/asciidoc-preview) preview plugins were inspiration for this project.
* The code started from the atom projects...
  * _active-editor-info_ example atom package
  * _vega-desktop_ node package
* Used the loophole package to adjust atom's Content Security Policy for the required packages
