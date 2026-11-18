import fs from 'fs';
import os from 'os';
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
        document_model: 'plone.blocks',
        path: path.join(core, 'document-model.block.md'),
      },
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
    expect(sources).toHaveLength(7);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('no-frontmatter.block.md'),
    );
  });

  test('finds the docs of elements, one per comma-separated name', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const heading = path.join(addon, 'Plate', 'heading.block.md');
    const sources = findBlocksDocs([addon]).filter((source) => source.element);

    expect(sources).toEqual([
      {
        element: 'h2',
        title: 'Heading',
        document_model: 'plone.plate',
        path: heading,
      },
      {
        element: 'h3',
        title: 'Heading',
        document_model: 'plone.plate',
        path: heading,
      },
    ]);
  });

  test('keeps an element of the same name in each document model', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'blocks-docs-'));
    try {
      fs.writeFileSync(
        path.join(dir, 'a.block.md'),
        '---\nelement: p\ndocument_model: plone.plate\n---\n',
      );
      fs.writeFileSync(
        path.join(dir, 'b.block.md'),
        '---\nelement: p\ndocument_model: other\n---\n',
      );

      expect(
        findBlocksDocs([dir]).map(({ element, document_model }) => [
          element,
          document_model,
        ]),
      ).toEqual([
        ['p', 'plone.plate'],
        ['p', 'other'],
      ]);
    } finally {
      fs.rmSync(dir, { recursive: true });
    }
  });

  test('finds the docs of document models', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const sources = findBlocksDocs([core, addon]).filter(
      (source) => source.document_model && !source.element,
    );

    expect(sources).toEqual([
      {
        document_model: 'plone.blocks',
        path: path.join(core, 'document-model.block.md'),
      },
      {
        document_model: 'plone.plate',
        path: path.join(addon, 'Plate', 'document.block.md'),
      },
    ]);
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

  test('imports a file that documents several elements once', () => {
    const code = getBlocksDocsLoaderCode([
      { element: 'h2', title: 'Heading', path: '/a/heading.block.md' },
      { element: 'h3', title: 'Heading', path: '/a/heading.block.md' },
      { document_model: 'plone.blocks', path: '/b/document.block.md' },
    ]);

    expect(code.match(/import docs/g)).toHaveLength(2);
    expect(code).toContain(
      '{ element: "h2", title: "Heading", markdown: docs0 },',
    );
    expect(code).toContain(
      '{ element: "h3", title: "Heading", markdown: docs0 },',
    );
    expect(code).toContain(
      '{ document_model: "plone.blocks", markdown: docs1 },',
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
