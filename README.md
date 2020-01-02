# A basic reproduction of the "This should never happen" error.

This repository is a basic Schematic implementation that illustrates a bug.

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

Output should look as follows :

```bash
Failures:
1) move-schematic works
  Message:
    Error: This should never happen. Path: "/projects/bar".
```
