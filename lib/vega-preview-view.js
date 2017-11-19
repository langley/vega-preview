'use babel';

// Import vega libraries but we need loophole for the atom CSP
const allowUnsafeNewFunction = require('loophole').allowUnsafeNewFunction;
Function = require('loophole').Function;
const Vega = allowUnsafeNewFunction(() => require('vega'));
const VegaLite = allowUnsafeNewFunction(() => require('vega-lite'));

const Http = require('http');

export default class VegaPreviewView {

  constructor(serializedState) {
    // Create root element
    if (this.element) {
      this.element.remove();
    }
    this.element = document.createElement('div');
    this.element.id = 'vega-preview-element';
    this.element.classList.add('vega-preview');

    this.subscriptions = atom.workspace.getCenter().observeActivePaneItem(item => {
      let vegaElement = createCleanVegaElement(this.element);

      let fileName;
      if (!atom.workspace.isTextEditor(item)) return;
      vegaElement.innerHTML = `
        <h2>${item.getFileName() || 'untitled'}</h2>
      `;

      const editor = atom.workspace.getActiveTextEditor();
      const vegaSpecStr = editor.getText();
      let vegaSpecJson;
      try {
        vegaSpecJson = JSON.parse(vegaSpecStr);
        renderVega(vegaSpecJson, this.element);
      } catch (ex) {
        console.log(`Warning: vegaSpecStr failed json parse... probably a non-vega-spec file.`);
      }
    });
  }

  getTitle() {
    // Used by Atom for tab text
    return 'VegaPreview';
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
    return 'atom://vega-preview'
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {
    return {
      deserializer: 'vega-preview/VegaPreviewView'
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


}


function renderVega(spec, element) {
  let vegaSpec = adjustVegaSpec(spec);

  const vegaPlot = document.createElement('div');
  vegaPlot.textContent = 'valid vega specs will render here';
  vegaPlot.classList.add('vega');
  element.appendChild(vegaPlot);

  try {
    const runtime = Vega.parse(vegaSpec);

    // Tell loader to resolve data and image files
    // relative to the spec file
    let editor = atom.workspace.getActivePaneItem();
    let file = editor != null ? editor.buffer.file : void 0;

    const loader = new Vega.loader({
      baseURL: file, //  path.dirname(filePath),
      mode: 'file'
    });

    // TODO why is this not a let or var?
    let view = new Vega.View(runtime, { loader })
      .initialize(vegaPlot)
      .hover()
      .run();
  } catch (ex) {
    console.log(`Invalid vega spec: ${ex.vegaElement}`);
  }
}

function adjustVegaSpec(spec) {
  let vegaSpec;
  try {
    vegaSpec = VegaLite.compile(spec).spec;
    return vegaSpec;
  } catch (ex) {
    console.log(`Error while compiling VegaLite spec: ${ex.vegaElement}`);
    return null;
  }
}

function createCleanVegaElement(rootNode) {
  // first, clean out the rootNode we're handed. SO and jsperf.com say this
  // is the fast way to do this.
  if (rootNode) {
    while (rootNode.firstChild) {
      rootNode.removeChild(rootNode.firstChild);
    }
  }
  // Create vegaElement element
  let vegaElement = document.createElement('div');
  vegaElement.id = 'vega-element';
  vegaElement.classList.add('vega-element');
  return vegaElement;
}
