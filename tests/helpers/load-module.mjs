import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

// Execute real TypeScript module bodies with every import replaced. No test
// loads credentials, opens a database connection, or sends a network request.
// A file URL plus an inline source map lets node's coverage reporter attribute
// these VM scripts to the TypeScript source lines.
export function loadModule(path, dependencies, { env = {}, logs = [], globals = {} } = {}) {
  const url = new URL(`../../${path}`, import.meta.url);
  const source = readFileSync(url, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    fileName: url.pathname,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, inlineSourceMap: true, inlineSources: true },
  });
  const loadedModule = { exports: {} };
  runInNewContext(outputText, {
    module: loadedModule,
    exports: loadedModule.exports,
    require(name) {
      assert.ok(Object.hasOwn(dependencies, name), `Unmocked import: ${name}`);
      return dependencies[name];
    },
    process: { env },
    console: Object.fromEntries(['log', 'warn', 'error'].map((method) => [
      method, (...args) => logs.push([method, ...args]),
    ])),
    URL,
    ...globals,
  }, { filename: url.href });
  return loadedModule.exports;
}
