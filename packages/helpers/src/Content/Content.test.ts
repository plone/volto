import {
  nestContent,
  getContentIcon,
  getLanguageIndependentFields,
} from './content';
import contentExistingSVG from '@plone/volto/icons/content-existing.svg';
import linkSVG from '@plone/volto/icons/link.svg';
import calendarSVG from '@plone/volto/icons/calendar.svg';
import folderSVG from '@plone/volto/icons/folder.svg';
import fileSVG from '@plone/volto/icons/file.svg';
import pageSVG from '@plone/volto/icons/page.svg';
import imageSVG from '@plone/volto/icons/image.svg';

describe('Content', () => {
  describe('nestContent', () => {
    it('can nest content', () => {
      expect(
        nestContent({
          title: 'Example',
          '@static_behaviors': [
            'guillotina_cms.interfaces.blocks.IBlocks',
            'guillotina_cms.interfaces.dublin_core.IDublinCore',
          ],
          'guillotina_cms.interfaces.blocks.IBlocks.blocks': 'blocks',
          'guillotina_cms.interfaces.blocks.IBlocks.blocks_layout':
            'blocks_layout',
          'guillotina_cms.interfaces.dublin_core.IDublinCore.creator':
            'creator',
        }),
      ).toEqual({
        title: 'Example',
        '@static_behaviors': [
          'guillotina_cms.interfaces.blocks.IBlocks',
          'guillotina_cms.interfaces.dublin_core.IDublinCore',
        ],
        'guillotina_cms.interfaces.blocks.IBlocks': {
          blocks: 'blocks',
          blocks_layout: 'blocks_layout',
        },
        'guillotina_cms.interfaces.dublin_core.IDublinCore': {
          creator: 'creator',
        },
      });
    });
  });

  describe('getContentIcon', () => {
    it('returns an icon for a document', () => {
      expect(getContentIcon('Document', false)).toBe(pageSVG);
    });

    it('returns an icon for a folder', () => {
      expect(getContentIcon('Folder', false)).toBe(folderSVG);
    });

    it('returns an icon for a news item', () => {
      expect(getContentIcon('News Item', false)).toBe(contentExistingSVG);
    });

    it('returns an icon for an event', () => {
      expect(getContentIcon('Event', false)).toBe(calendarSVG);
    });

    it('returns an icon for an image', () => {
      expect(getContentIcon('Image', false)).toBe(imageSVG);
    });

    it('returns an icon for a file', () => {
      expect(getContentIcon('File', false)).toBe(fileSVG);
    });

    it('returns an icon for a link', () => {
      expect(getContentIcon('Link', false)).toBe(linkSVG);
    });

    it('returns an icon for a folderish item', () => {
      expect(getContentIcon('Custom', true)).toBe(folderSVG);
    });

    it('returns an icon for a non folderish item', () => {
      expect(getContentIcon('Custom', false)).toBe(fileSVG);
    });
  });

  describe('getLanguageIndependentFields', () => {
    it('returns the language independenr field', () => {
      const schema = {
        properties: {
          lif: {
            multilingual_options: {
              language_independent: true,
            },
          },
        },
      };
      expect(getLanguageIndependentFields(schema)).toStrictEqual(['lif']);
    });
  });
});
