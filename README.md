<div align="center">
  <a href="https://r-factor.org">
    <img src="https://raw.githubusercontent.com/limesquid/r-factor/master/logo.png" alt="R-Factor logo" />
  </a>

  <h1>R-Factor extension for Atom</h1>

  <p>
    <img src="https://img.shields.io/github/package-json/v/limesquid/r-factor-atom.svg" alt="Version" />
    <a href="https://github.com/limesquid/r-factor-atom/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/limesquid/r-factor-atom" alt="license" />
    </a>
  </p>

  <p>
    <a href="https://r-factor.org">Website</a> • <a href="https://r-factor.org/documentation">Documentation</a>
  </p>

  <hr />

  <p>
    <a href="https://github.com/limesquid/r-factor">R-Factor</a> • <a href="https://github.com/limesquid/r-factor-website">r-factor.org</a>
    <br />
    <a href="https://github.com/limesquid/r-factor-atom">Atom</a> • <a href="https://github.com/limesquid/r-factor-sublime">Sublime Text</a> • <a href="https://github.com/limesquid/r-factor-vscode">Visual Studio Code</a>
  </p>

  <hr />
</div>

## Install

### Stable version

```Shell
wget -c https://github.com/limesquid/r-factor-atom/archive/refs/tags/1.0.1.zip -O r-factor-atom.zip
mkdir -p ~/.atom/packages
unzip r-factor-atom.zip -d ~/.atom/packages
rm r-factor-atom.zip
mv ~/.atom/packages/r-factor-atom-1.0.0 ~/.atom/packages/r-factor-atom
cd ~/.atom/packages/r-factor-atom
npm install
```

### Latest (master)

```Shell
wget -c https://github.com/limesquid/r-factor-atom/archive/refs/heads/master.zip -O r-factor-atom.zip
mkdir -p ~/.atom/packages
unzip r-factor-atom.zip -d ~/.atom/packages
rm r-factor-atom.zip
mv ~/.atom/packages/r-factor-atom-master ~/.atom/packages/r-factor-atom
cd ~/.atom/packages/r-factor-atom
npm install
```

## Uninstall

```Shell
rm -rf ~/.atom/packages/r-factor-atom
```
