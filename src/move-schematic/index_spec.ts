import { Tree } from '@angular-devkit/schematics';
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
import { moveSchematic } from '.';
import { Schema } from './schema';

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
    tree = new UnitTestTree(Tree.empty());

    tree = await runner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'workspace',
        workspaceOptions,
        tree
      )
      .toPromise();

    tree = await runner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'application',
        appOptions,
        tree
      )
      .toPromise();
  });

  it('works', async () => {
    const schema: Schema = {
      source: 'projects/bar',
      destination: 'projects/foo'
    };

    tree = (await runner
      .callRule(moveSchematic(schema), tree)
      .toPromise()) as UnitTestTree;

    expect(tree.files).toEqual([
      '/README.md',
      '/.editorconfig',
      '/.gitignore',
      '/angular.json',
      '/package.json',
      '/tsconfig.json',
      '/tslint.json',
      '/projects/foo/browserslist',
      '/projects/foo/karma.conf.js',
      '/projects/foo/tsconfig.app.json',
      '/projects/foo/tsconfig.spec.json',
      '/projects/foo/tslint.json',
      '/projects/foo/src/favicon.ico',
      '/projects/foo/src/index.html',
      '/projects/foo/src/main.ts',
      '/projects/foo/src/polyfills.ts',
      '/projects/foo/src/styles.css',
      '/projects/foo/src/test.ts',
      '/projects/foo/src/assets/.gitkeep',
      '/projects/foo/src/environments/environment.prod.ts',
      '/projects/foo/src/environments/environment.ts',
      '/projects/foo/src/app/app.module.ts',
      '/projects/foo/src/app/app.component.css',
      '/projects/foo/src/app/app.component.html',
      '/projects/foo/src/app/app.component.spec.ts',
      '/projects/foo/src/app/app.component.ts',
      '/projects/foo/e2e/protractor.conf.js',
      '/projects/foo/e2e/tsconfig.json',
      '/projects/foo/e2e/src/app.e2e-spec.ts',
      '/projects/foo/e2e/src/app.po.ts'
    ]);
  });
});
