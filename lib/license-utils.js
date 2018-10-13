'use babel';

import fs from 'fs';
import path from 'path';

export const writeLicense = (license) => fs.writeFileSync(getLicenseFilePath(), license);

export const readLicense = (license) => {
  try {
    return fs.readFileSync(getLicenseFilePath(), 'utf-8');
  } catch (error) {
    return null;
  }
};

const getLicenseFilePath = () => {
  const packagePath = atom.packages.getActivePackage('r-factor').path;
  return path.resolve(packagePath, 'user_license');
};
