'use babel';

import { CompositeDisposable } from 'atom';
import rFactor from 'r-factor';
import menuConfig from '../menus/r-factor.json';
import { WARMUP_COUNT, WARMUP_CODE, WARMUP_REFACTORING } from './warm-up';

const commands = menuConfig.menu
  .find(({ label }) => label === 'Packages').submenu
  .find(({ label }) => label === 'R-Factor').submenu;

const prepareConfig = (config) => ({
  ...config,
  'end-of-line': config['end-of-line'].replace('\\r', '\r').replace('\\n', '\n')
});

export default {
  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable();

    commands.forEach(({ command, label }) => {
      const rFactorCommand = command.split(':')[1];
      const listener = {
        displayName: `R-Factor: ${label}`,
        didDispatch: () => this.runCommand(rFactorCommand)
      };
      this.subscriptions.add(atom.commands.add(
        'atom-workspace',
        command,
        listener
      ));
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
  for (let i = 0; i < WARMUP_COUNT; ++i) {
    rFactor({
      code: WARMUP_CODE,
      refactoring: WARMUP_REFACTORING
    });
  }
};
