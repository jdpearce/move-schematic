import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Schema } from './schema';

/**
 * Moves a project to the given destination path
 *
 * @param schema The options provided to the schematic
 */
export function moveSchematic(schema: Schema): Rule {
  return (host: Tree, _context: SchematicContext): Tree => {
    const dir = host.getDir(schema.source);
    dir.visit(file => {
      const newPath = file.replace(schema.source, schema.destination);

      const buffer = host.read(file);
      if (buffer === null) {
        return;
      }

      host.create(newPath, buffer);
    });

    host.delete(schema.source);

    return host;
  };
}
