## 0.3
* Added support for relative urls in specs.
* Moved the data directory to the examples directory to be   
  consistent with other atom plugins. 

## 0.2.1 - Okay, okay... I'm starting to "get it"
* the apm publish command updates your package.json!

## 0.1.1 - Messed up the apm publishing
* the package.json was set to verion 0.1.0 but the change log read 0.0.2!
* Note: this version supports both vega and vega-lite specs.
* There's still an issue with not rendering when a file is initially selected
  from the project pane. If you tab to a different file and then back to the
  the newly previewed file, it renders properly.


## 0.0.2 - Basic functionality is working
* Open a valid vega or vega-lite spec in atom,
* use the keybinding: crtrl-alt-v to render the spec currently open in the editor in a side panel,
* The data directory has some simple examples and
  the data needed to drive them.
* The data spec can use relative urls, see the examples.
* Renamed from vega-atom to vega-preview

## 0.0.1 - Building out basic functionality
* Really had to dig around to figure out how to work around the Content Security Policy that atom enforces. Several vega libraries generate Functions (using the JavaScript Function object) and these were getting flagged as unsafe. Using loophole fixed this.
* Also did a fair amount of learning about JavaScript!
