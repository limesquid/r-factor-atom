'use babel';

import stream from 'stream';
import { exec } from 'child_process';
import { CompositeDisposable } from 'atom';

const BIN = '/Users/yuriy/Library/Application Support/Sublime Text 3/Packages/refucktoring/dist/index.js';

module.exports = {
  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    const commands = [
      'add-classname',
      'connect',
      'connect-map-state-to-props',
      'connect-map-dispatch-to-props',
      'connect-merge-props',
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

  getExecutableCommand(command) {
    const config = atom.config.get('R-Factor');
    const NODE_BIN = '/Users/yuriy/.nvm/versions/node/v8.11.3/bin/node' || config['NODE_BIN'];
    const settings = JSON.stringify(config);
    return [
        NODE_BIN, `"${BIN}"`,
        '-r', command,
        '-s', `"${settings.replace(/"/g, '\\"')}"`
    ].join(' ');
  },

  getEditingData() {
    const editor = atom.workspace.getActiveTextEditor();
    const selection = editor.getSelectedText();
    const code = editor.getText();
    return { code, editor, selection };
  },

  runCommand(command) {
    const { code, editor, selection } = this.getEditingData();
    console.log(code);
    const executableCommand = this.getExecutableCommand(command);
    const child = exec(executableCommand, (error, stdout, stderr) => {
      const refactoredCode = error || stderr || stdout;
      editor.setText(refactoredCode);
    });
    const stdinStream = new stream.Readable();
    stdinStream.push(code);
    stdinStream.push(null);
    stdinStream.pipe(child.stdin);
  }
};