## 0.0.2 - Basic functionality is working
* Open a valid vega-lite spec in atom,
* use the keybinding: crtrl-alt-z to render the spec currently open in the editor in a side panel,
* The data directory has some simple examples and
  the data needed to drive them.
* The data spec can use relative urls, see the examples.
* Renamed from vega-atom to vega-preview

## 0.0.1 - Building out basic functionality
* Really had to dig around to figure out how to work around the Content Security Policy that atom enforces. Several vega libraries generate Functions (using the JavaScript Function object) and these were getting flagged as unsafe. Using loophole fixed this.
* Also did a fair amount of learning about JavaScript!
