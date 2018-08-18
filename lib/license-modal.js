'use babel';

import { Point, TextEditor } from 'atom';
const exec = require('child_process').exec;

export default class ManView {

  constructor() {
    this.paneItem = null;

    this.miniEditor = new TextEditor({ mini: true });
    this.miniEditor.element.addEventListener('blur', this.close.bind(this));
    this.miniEditor.setPlaceholderText('Enter your license');

    this.message = document.createElement('div');
    this.message.classList.add('message');

    this.element = document.createElement('div');
    this.element.classList.add('r-factor');
    this.element.appendChild(this.miniEditor.element);
    this.element.appendChild(this.message);

    this.panel = atom.workspace.addModalPanel({
      item: this,
      visible: false
    });

    atom.commands.add(this.miniEditor.element, 'core:confirm', () => {
      this.confirm();
    });

    atom.commands.add(this.miniEditor.element, 'core:cancel', () => {
      this.close();
    });
  }

  close() {
    if (!this.panel.isVisible()) {
      return;
    }
    this.miniEditor.setText('');
    this.panel.hide();
    if (this.miniEditor.element.hasFocus()) {
      this.restoreFocus();
    }
  }

  confirm() {
    const licenseKey = this.miniEditor.getText();
    atom.config.set('r-factor.license', licenseKey);
    this.close();

    setTimeout(() => {
      atom.confirm({
        message: 'R-Factor',
        detailedMessage: 'Your R-Factor license key has been successfully added'
      });
    }, 0);
  }

  storeFocusedElement() {
    this.previouslyFocusedElement = document.activeElement;
    return this.previouslyFocusedElement;
  }

  restoreFocus() {
    if (this.previouslyFocusedElement && this.previouslyFocusedElement.parentElement) {
      return this.previouslyFocusedElement.focus();
    }
    atom.views.getView(atom.workspace).focus();
  }

  open() {
    if (this.panel.isVisible()) {
      return;
    }
    this.storeFocusedElement();
    this.panel.show();
    this.message.textContent = "Enter your R-Factor license key";
    this.miniEditor.element.focus();
  }

  serialize() {}

  destroy() {
    this.element.remove();
  }
}
