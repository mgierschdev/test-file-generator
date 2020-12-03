#!/usr/bin/env node
import yargs = require('yargs/yargs');
import { TestFileGenerator } from './classes/TestFileGenerator';

type fileType = 'jpeg' | 'gif' | 'cvs' | 'txt';
const filesTypes: ReadonlyArray<fileType> = ['jpeg', 'gif', 'cvs', 'txt'];

const argv = yargs(process.argv.slice(2))
  .usage('Usage: generate --type gif')
  .options({
    path: { type: 'string', default: './', description: 'default ./', alias: 'path' },
    type: { choices: filesTypes, default: 'jpeg' },
    number: { type: 'number', default: '1' },
  }).argv;

const generator = new TestFileGenerator(argv.type);
generator.setLocation(argv.path);

for (let i = 0; i < Number(argv.number); i++) {
  generator.generateFile();
  console.log('File created ' + generator.getCreated());
}
