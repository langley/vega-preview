'use babel';

import VegaAtomView from './vega-atom-view';
import {CompositeDisposable, Disposable} from 'atom';


// Import vega libraries but we need loophole for the atom CSP
var allowUnsafeNewFunction = require('loophole').allowUnsafeNewFunction;
global.Function = require('loophole').Function;
global.Vega = allowUnsafeNewFunction(() => require('vega'));
global.VegaLite = allowUnsafeNewFunction(() => require('vega-lite'));


export default {

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable(
      // Add an opener for our view.
      atom.workspace.addOpener(uri => {
        if (uri === 'atom://vega-atom') {
          return new VegaAtomView();
        }
      }),

      // Register command that toggles this view
      atom.commands.add('atom-workspace', {
        'vega-atom:toggle': () => this.toggle()
      }),

      // Destroy any VegaAtomViews when the package is deactivated.
      new Disposable(() => {
        atom.workspace.getPaneItems().forEach(item => {
          if (item instanceof VegaAtomView) {
            item.destroy();
          }
        });
      })
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
    atom.workspace.toggle('atom://vega-atom');
  },

  deserializeVegaAtomView(serialized) {
    return new VegaAtomView();
  }

};
