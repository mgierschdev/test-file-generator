import { TestFileGenerator } from '../classes/TestFileGenerator';

it('Creates a new text file', () => {
  let generator = new TestFileGenerator('txt');
  generator.setLocation('exampleOutput/');
  generator.setClean(true); //to delete the created image
  expect(generator.generateFile()).toBe(true);
});

it('Creates a new text of 30KB', () => {
  let generator = new TestFileGenerator('txt');
  generator.setLocation('exampleOutput/');
  generator.setSize(30);
  generator.setClean(true);
  expect(generator.generateFile()).toBe(true);
});

it('Creates a new CVS of 20KB', () => {
  let generator = new TestFileGenerator('cvs');
  generator.setLocation('exampleOutput/');
  generator.setClean(true);
  expect(generator.generateFile()).toBe(true);
});

it('Creates a new CVS of 30KB', () => {
  let generator = new TestFileGenerator('cvs');
  generator.setLocation('exampleOutput/');
  generator.setSize(30);
  generator.setClean(true);
  expect(generator.generateFile()).toBe(true);
});

it('Creates a new JPEG of 100 x 100', () => {
  let generator = new TestFileGenerator('jpeg');
  generator.setLocation('exampleOutput/');
  generator.setClean(true);
  expect(generator.generateFile()).toBe(true);
});

it('Creates a new JPEG of 10 x 10', () => {
  let generator = new TestFileGenerator('jpeg');
  generator.setLocation('exampleOutput/');
  generator.setImageSize(10, 10);
  generator.setClean(true);
  expect(generator.generateFile()).toBe(true);
});

it('Creates a new Gif of 100 x 100', () => {
  let generator = new TestFileGenerator('gif');
  generator.setLocation('exampleOutput/');
  generator.setClean(true);
  expect(generator.generateFile()).toBe(true);
});

it('Creates a new Gif of 200 x 200', () => {
  let generator = new TestFileGenerator('gif');
  generator.setImageSize(200, 200);
  generator.setLocation('exampleOutput/');
  generator.setClean(true);
  expect(generator.generateFile()).toBe(true);
});
