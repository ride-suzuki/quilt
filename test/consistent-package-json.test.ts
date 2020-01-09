import {readJSONSync} from 'fs-extra';
import {join, resolve} from 'path';
import glob from 'glob';

const packages = readPackages();

packages.forEach(({packageName, packageJSON}) => {
  describe(`${packageName}'s package.json`, () => {
    it('specifies Shopify as author', () => {
      expect(packageJSON.author).toBe('Shopify Inc.');
    });

    it('specifies Quilt Issues as bugs URL', () => {
      expect(packageJSON.bugs).toEqual({
        url: 'https://github.com/Shopify/quilt/issues',
      });
    });

    it('specifies a description', () => {
      expect(packageJSON.description).not.toBeUndefined();
    });

    it('specifies Quilt deep-link homepage', () => {
      expect(packageJSON.homepage)
        .toBe(`https://github.com/Shopify/quilt/blob/master/packages/${packageName}/README.md`);
    });

    it('specifies the MIT license', () => {
      expect(packageJSON.license).toBe('MIT');
    });

    it('specifies the expected main', () => {
      expect(packageJSON.main).toBe('dist/src/index.js');
    });

    it('specifies name matching scope and path', () => {
      expect(packageJSON.name).toBe(`@shopify/${packageName}`);
    });

    it('specifies the expected publishConfig', () => {
      expect(packageJSON.publishConfig).toEqual({
        access: "public",
        "@shopify:registry": "https://registry.npmjs.org",
      });
    });

    it('specifies a repository deep-linking into the Quilt monorepo', () => {
      expect(packageJSON.repository).toBe(`https://github.com/Shopify/quilt/tree/master/packages/${packageName}`);
    });

    it('specifies if it has sideEffects', () => {
      expect(packageJSON.sideEffects === true || packageJSON.sideEffects === false);
    });

    it('specifies the expected types', () => {
      expect(packageJSON.types).toBe('dist/src/index.d.ts');
    });

    it('specifies a version', () => {
      expect(packageJSON.version).not.toBeUndefined();
    });
  });
});

it('passes', () => {
  expect(true);
});

function readPackages() {
  const packagesPath = resolve(__dirname, '..', 'packages');
  const packageStartIndex = 1 + packagesPath.length;
  const packageEndIndex = -1 - 'package.json'.length;

  return glob
    .sync(join(packagesPath, '*', 'package.json'))
    .map((packageJSONPath) => {
      const packageName = packageJSONPath.slice(packageStartIndex, packageEndIndex);
      const packageJSON = readJSONSync(packageJSONPath);

      return {packageName, packageJSON};
    });
}
