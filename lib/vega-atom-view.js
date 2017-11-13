'use babel';

// Import vega libraries but we need loophole for the atom CSP
const allowUnsafeNewFunction = require('loophole').allowUnsafeNewFunction;
global.Function = require('loophole').Function;
global.Vega = allowUnsafeNewFunction(() => require('vega'));
global.VegaLite = allowUnsafeNewFunction(() => require('vega-lite'));



export default class VegaAtomView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('vega-atom');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The VegaAtom package is alive!';
    message.classList.add('message');
    this.element.appendChild(message);

    this.subscriptions = atom.workspace.getCenter().observeActivePaneItem(item => {
      if (!atom.workspace.isTextEditor(item)) return;
      message.innerHTML = `
        <h2>${item.getFileName() || 'untitled'}</h2>
      `;
      this.renderVega(this.element);
    });
  }

  getTitle() {
    // Used by Atom for tab text
    return 'VegaAtom';
  }

  getDefaultLocation() {
    // This location will be used if the user hasn't overridden it by dragging the item elsewhere.
    // Valid values are "left", "right", "bottom", and "center" (the default).
    return 'right';
  }

  getAllowedLocations() {
    // The locations into which the item can be moved.
    return ['left', 'right', 'bottom'];
  }

  getURI() {
    // Used by Atom to identify the view when toggling.
    return 'atom://vega-atom'
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {
    return {
      deserializer: 'vega-atom/VegaAtomView'
    };
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
    this.subscriptions.dispose();
  }

  getElement() {
    return this.element;
  }

  renderVega(element) {
    console.log(`VegaRender was called @ ${new Date()}`);
    var spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v2.0.json",
      "description": "A simple bar chart with embedded data.",
      "data": {
        "values": [
          {"a": "A","b": 28}, {"a": "B","b": 55}, {"a": "C","b": 43},
          {"a": "D","b": 91}, {"a": "E","b": 81}, {"a": "F","b": 53},
          {"a": "G","b": 19}, {"a": "H","b": 87}, {"a": "I","b": 52}
        ]
      },
      "mark": "bar",
      "encoding": {
        "x": {"field": "a", "type": "ordinal"},
        "y": {"field": "b", "type": "quantitative"}
      },
      "config": {
        "axis": {
          "labelFont": "serif",
          "labelFontSize": 16,
          "tickWidth": 3,
          "tickColor": "red"
        }
      }
    }

    var vegaSpec;
    try {
      vegaSpec = VegaLite.compile(spec).spec;
    } catch (ex) {
      console.log(`Error while compiling VegaLite spec: ${ex.message}`);
    }

    const newChart = document.createElement('div');
    newChart.textContent = 'renderVega';
    newChart.classList.add('vega');
    element.appendChild(newChart);

    try {
      const runtime = Vega.parse(vegaSpec);

      // Tell loader to resolve data and image files
      // relative to the spec file
      var editor = atom.workspace.getActivePaneItem();
      var file = editor != null ? editor.buffer.file : void 0;

      const loader = new Vega.loader({
        baseURL: file, //  path.dirname(filePath),
        mode: 'file'
      });

      view = new Vega.View(runtime, { loader })
        .initialize(newChart)
        .hover()
        .run();
    } catch (ex) {
      console.log(`Invalid vega spec: ${ex.message}`);
    }
  }

}