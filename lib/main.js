'use babel';

import { CompositeDisposable } from 'atom';
import LicenseModal from './license-modal';
import { readLicense } from './license-utils';
import { WARMUP_COUNT, WARMUP_CODE, WARMUP_REFACTORING } from './warm-up';
import rFactor from '../r-factor';

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

const prepareConfig = (config) => ({
  ...config,
  'end-of-line': config['end-of-line'].replace('\\r', '\r').replace('\\n', '\n')
});

export default {
  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.licenseModal = new LicenseModal();

    atom.commands.add('atom-workspace', {
      ['r-factor:enter-license-key']: () => {
        this.licenseModal.open(warmUp);
      }
    });

    commands.forEach((command) => {
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        [`r-factor:${command}`]: () => this.runCommand(command)
      }));
    });

    setTimeout(warmUp);
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

  refactor(code, refactoring) {
    try {
      return rFactor({
        code,
        license: readLicense(),
        refactoring,
        settings: prepareConfig(atom.config.get('r-factor'))
      });
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

const warmUp = () => {
  const license = readLicense();

  if (license) {
    for (let i = 0; i < WARMUP_COUNT; ++i) {
      rFactor({
        code: WARMUP_CODE,
        license,
        refactoring: WARMUP_REFACTORING
      });
    }
  }
};
