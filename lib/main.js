'use babel';

import stream from 'stream';
import { exec } from 'child_process';
import { CompositeDisposable } from 'atom';
import { readLicense } from './license-utils';
import LicenseModal from './license-modal';
import { WARMUP_COUNT, WARMUP_CODE, WARMUP_REFACTORING } from './warm-up';

const rFactor = require('../r-factor.js');

module.exports = {
  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.licenseModalView = new LicenseModal();
    setTimeout(this.warmUp);

    atom.commands.add('atom-workspace', {
      [`r-factor:enter-license-key`]: () => {
        this.licenseModalView.open();
      }
    });

    const commands = [
      'add-classname',
      'connect',
      'connect-map-state-to-props',
      'connect-map-dispatch-to-props',
      'connect-merge-props',
      'convert-svg-to-component',
      'convert-to-class-component',
      'convert-to-arrow-component',
      'convert-to-function-component',
      'disconnect',
      'disconnect-map-state-to-props',
      'disconnect-map-dispatch-to-props',
      'disconnect-merge-props',
      'generate-prop-types',
      'move-default-props-and-prop-types-out-of-class',
      'move-default-props-and-prop-types-to-class',
      'sort-attributes',
      'sort-imports',
      'toggle-component-type',
      'toggle-with-router-hoc'
    ];

    commands.forEach((command) => {
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        [`r-factor:${command}`]: () => this.runCommand(command)
      }));
    });
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  getEditingData() {
    const editor = atom.workspace.getActiveTextEditor();
    const selection = editor.getSelectedText();
    const code = editor.getText();
    return { code, editor, selection };
  },

  warmUp() {
    const license = readLicense();
    for (let i = 0; i < WARMUP_COUNT; ++i) {
      rFactor({
        code: WARMUP_CODE,
        license,
        refactoring: WARMUP_REFACTORING
      });
    }
  },

  refactor(code, refactoring) {
    const license = readLicense();
    const settings = atom.config.get('r-factor');
    try {
      return rFactor({ code, license, refactoring, settings });
    } catch (error) {
      return String(error);
    }
  },

  runCommand(refactoring) {
    const { code, editor } = this.getEditingData();
    const refactoredCode = this.refactor(code, refactoring);
    editor.setText(refactoredCode);
  }
};
