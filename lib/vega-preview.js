'use babel';

import VegaPreviewView from './vega-preview-view';
import {CompositeDisposable, Disposable} from 'atom';


// Import vega libraries but we need loophole for the atom CSP
const allowUnsafeNewFunction = require('loophole').allowUnsafeNewFunction;
Function = require('loophole').Function;
const Vega = allowUnsafeNewFunction(() => require('vega'));
const VegaLite = allowUnsafeNewFunction(() => require('vega-lite'));


export default {

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable(
      // Add an opener for our view.
      atom.workspace.addOpener(uri => {
        if (uri === 'atom://vega-preview') {
          console.log('Made new VegaPreviewView');
          return new VegaPreviewView();
        } else {
          console.log('DID NOT MAKE a new VegaPreviewView');
        }
      }),

      // Register command that toggles this view
      atom.commands.add('atom-workspace', {
        'vega-preview:toggle': () => this.toggle()
      }),

      // Destroy any VegaPreviewViews when the package is deactivated.
      new Disposable(() => {
        atom.workspace.getPaneItems().forEach(item => {
          if (item instanceof VegaPreviewView) {
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
    atom.workspace.toggle('atom://vega-preview');
  },

  deserializeVegaPreviewView(serialized) {
    return new VegaPreviewView();
  }

};
