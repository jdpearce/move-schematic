import {
  SchematicTestRunner,
  UnitTestTree
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

const workspaceOptions: WorkspaceOptions = {
  name: 'workspace',
  newProjectRoot: 'projects',
  version: '6.0.0'
};

const appOptions: ApplicationOptions = {
  name: 'bar',
  inlineStyle: false,
  inlineTemplate: false,
  routing: false,
  style: Style.Css,
  skipTests: false,
  skipPackageJson: false
};

describe('move-schematic', () => {
  let tree: UnitTestTree;
  let runner: SchematicTestRunner;

  beforeEach(async () => {
    runner = new SchematicTestRunner('schematics', collectionPath);
    tree = runner.runExternalSchematic(
      '@schematics/angular',
      'workspace',
      workspaceOptions
    );
    tree = runner.runExternalSchematic(
      '@schematics/angular',
      'application',
      appOptions,
      tree
    );
  });

  it('works', () => {
    expect(tree.files).toEqual([
      '/README.md',
      '/angular.json',
      '/package.json',
      '/tsconfig.json',
      '/tslint.json',
      '/.editorconfig',
      '/.gitignore',
      '/projects/bar/src/app/test/test.spec.ts',
      '/projects/bar/src/app/test/test.ts'
    ]);
  });
});
