'use babel';

import { Point, TextEditor } from 'atom';
import { exec } from 'child_process';
import { writeLicense } from './license-utils';

class LicenseModal {
  constructor() {
    this.close = this.close.bind(this);

    this.miniEditor = createMiniEditor({ onBlur: this.close });
    this.message = createMessageElement();
    this.element = createLicenseModalElement({
      miniEditor: this.miniEditor,
      message: this.message
    });
    this.panel = atom.workspace.addModalPanel({
      item: this,
      visible: false
    });

    atom.commands.add(this.miniEditor.element, 'core:confirm', () => this.confirm());
    atom.commands.add(this.miniEditor.element, 'core:cancel', () => this.close());
  }

  destroy() {
    this.element.remove();
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

  open() {
    if (this.panel.isVisible()) {
      return;
    }
    this.storeActiveElement();
    this.panel.show();
    this.message.textContent = "Enter your R-Factor license key";
    this.miniEditor.element.focus();
  }

  confirm() {
    const licenseKey = this.miniEditor.getText();
    writeLicense(licenseKey);
    this.close();

    setTimeout(() => {
      atom.confirm({
        message: 'R-Factor',
        detailedMessage: 'Your R-Factor license key has been successfully added'
      });
    });
  }

  storeActiveElement() {
    this.previouslyActiveElement = document.activeElement;
    return this.previouslyActiveElement;
  }

  restoreFocus() {
    if (this.previouslyActiveElement && this.previouslyActiveElement.parentElement) {
      return this.previouslyActiveElement.focus();
    }

    atom.views.getView(atom.workspace).focus();
  }

  serialize() {}
}

const createMiniEditor = ({ onBlur }) => {
  const miniEditor = new TextEditor({ mini: true });
  miniEditor.element.addEventListener('blur', onBlur);
  miniEditor.setPlaceholderText('Enter your license');
  return miniEditor;
};

const createMessageElement = () => {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  return messageElement;
};

const createLicenseModalElement = ({ miniEditor, message }) => {
  const licenseModalElement = document.createElement('div');
  licenseModalElement.classList.add('r-factor');
  licenseModalElement.appendChild(miniEditor.element);
  licenseModalElement.appendChild(message);
  return licenseModalElement;
};

export default LicenseModal;
