'use babel';

import { CompositeDisposable } from 'atom';
import LicenseModal from './license-modal';
import { readLicense } from './license-utils';
import { WARMUP_COUNT, WARMUP_CODE, WARMUP_REFACTORING } from './warm-up';
import rFactor from '../r-factor';
import menuConfig from '../menus/r-factor.json';

const commands = menuConfig.menu
  .find(({ label }) => label === 'Packages').submenu
  .find(({ label }) => label === 'R-Factor').submenu;

const ENTER_LICENSE_COMMAND = 'enter-license-key';

const prepareConfig = (config) => ({
  ...config,
  'end-of-line': config['end-of-line'].replace('\\r', '\r').replace('\\n', '\n')
});

export default {
  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.licenseModal = new LicenseModal();

    commands.forEach(({ command, label }) => {
      const rFactorCommand = command.split(':')[1];
      const listener = {
        displayName: `R-Factor: ${label}`,
        didDispatch: rFactorCommand === ENTER_LICENSE_COMMAND
          ? () => this.licenseModal.open(warmUp)
          : () => this.runCommand(rFactorCommand),
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
