'use babel'
import fs from 'fs';
import path from 'path';

const getLicenseFilePath = () => {
  const packagePath = atom.packages.getActivePackage('r-factor').path;
  return path.resolve(packagePath, 'user_license');
}

export const writeLicense = (license) => fs.writeFileSync(getLicenseFilePath(), license, { encoding: 'utf-8' });
export const readLicense = (license) => {
  try {
    return fs.readFileSync(getLicenseFilePath());
  } catch(error) {
    return null;
  }
};
