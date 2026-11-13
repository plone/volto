import fs from 'fs';
import path from 'path';
import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  createBlocksDocsLoader,
  findBlocksDocs,
  getBlocksDocsLoaderCode,
  parseFrontmatter,
  stripFrontmatter,
} from '../src/addon-registry/create-blocks-docs-loader';

const fixtures = path.join(__dirname, 'fixtures', 'blocks-docs');
const core = path.join(fixtures, 'core');
const addon = path.join(fixtures, 'addon', 'src');

describe('frontmatter', () => {
  test('reads the keys and strips quotes', () => {
    expect(
      parseFrontmatter(
        '---\nblock: "listing"\nvariation: gallery\n---\n\nText',
      ),
    ).toEqual({ block: 'listing', variation: 'gallery' });
  });

  test('is empty without frontmatter', () => {
    expect(parseFrontmatter('Just text\n---\n')).toEqual({});
  });

  test('is stripped from the Markdown', () => {
    expect(stripFrontmatter('---\nblock: teaser\n---\n\nText')).toBe('\nText');
    expect(stripFrontmatter('Text')).toBe('Text');
  });
});

describe('findBlocksDocs', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('finds *.block.md files with a block, outside node_modules', () => {
    expect(findBlocksDocs([core])).toEqual([
      {
        block: 'listing',
        path: path.join(core, 'Listing', 'docs.block.md'),
      },
      {
        block: 'listing',
        variation: 'imageGallery',
        path: path.join(core, 'Listing', 'gallery.block.md'),
      },
      { block: 'teaser', path: path.join(core, 'Teaser', 'docs.block.md') },
    ]);
  });

  test('lets later folders replace the docs of earlier ones', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const sources = findBlocksDocs([core, addon]);

    expect(sources.find((source) => source.block === 'teaser').path).toBe(
      path.join(addon, 'Teaser', 'teaser.block.md'),
    );
    expect(sources).toHaveLength(3);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('no-frontmatter.block.md'),
    );
  });

  test('ignores folders that do not exist', () => {
    expect(findBlocksDocs([path.join(fixtures, 'missing')])).toEqual([]);
  });
});

describe('getBlocksDocsLoaderCode', () => {
  test('imports each file raw and exports the list', () => {
    const code = getBlocksDocsLoaderCode([
      { block: 'teaser', path: '/a/teaser.block.md' },
      { block: 'listing', variation: 'gallery', path: '/b/gallery.block.md' },
    ]);

    expect(code).toContain('import docs0 from "/a/teaser.block.md?raw";');
    expect(code).toContain('import docs1 from "/b/gallery.block.md?raw";');
    expect(code).toContain('{ block: "teaser", markdown: docs0 },');
    expect(code).toContain(
      '{ block: "listing", variation: "gallery", markdown: docs1 },',
    );
  });

  test('exports an empty list without docs', () => {
    expect(getBlocksDocsLoaderCode([])).toContain('export default [\n\n];');
  });
});

describe('createBlocksDocsLoader', () => {
  test('writes the loader and returns its path', () => {
    const loaderPath = createBlocksDocsLoader([core]);
    try {
      expect(fs.readFileSync(loaderPath, 'utf-8')).toBe(
        getBlocksDocsLoaderCode(findBlocksDocs([core])),
      );
    } finally {
      fs.unlinkSync(loaderPath);
    }
  });
});
