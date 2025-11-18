import {
  nestContent,
  getContentIcon,
  getLanguageIndependentFields,
  flattenStaticBehaviors,
  getLanguageToken,
} from './Content';
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

  describe('flattenStaticBehaviors', () => {
    it('returns object unchanged when no @static_behaviors', () => {
      const input = {
        title: 'Example',
        creator: 'admin',
      };
      expect(flattenStaticBehaviors(input)).toEqual(input);
    });

    it('flattens static behaviors into dot-notation keys', () => {
      const input = {
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
      };
      expect(flattenStaticBehaviors(input)).toEqual({
        title: 'Example',
        '@static_behaviors': [
          'guillotina_cms.interfaces.blocks.IBlocks',
          'guillotina_cms.interfaces.dublin_core.IDublinCore',
        ],
        'guillotina_cms.interfaces.blocks.IBlocks.blocks': 'blocks',
        'guillotina_cms.interfaces.blocks.IBlocks.blocks_layout':
          'blocks_layout',
        'guillotina_cms.interfaces.dublin_core.IDublinCore.creator': 'creator',
      });
    });
  });

  describe('getLanguageToken', () => {
    it('returns null when language is undefined', () => {
      expect(getLanguageToken(undefined)).toBe(null);
    });

    it('returns null when language is null', () => {
      expect(getLanguageToken(null)).toBe(null);
    });

    it('returns the string when language is a string', () => {
      expect(getLanguageToken('en')).toBe('en');
      expect(getLanguageToken('pt-br')).toBe('pt-br');
      expect(getLanguageToken('de')).toBe('de');
    });

    it('returns token when language is an object with token property', () => {
      expect(getLanguageToken({ token: 'en', title: 'English' })).toBe('en');
      expect(getLanguageToken({ token: 'de' })).toBe('de');
      expect(getLanguageToken({ token: 'pt-br', title: 'Portuguese (Brazil)' })).toBe('pt-br');
    });

    it('returns null when language is an object without token property', () => {
      expect(getLanguageToken({ title: 'English' })).toBe(null);
      expect(getLanguageToken({})).toBe(null);
    });

    it('returns null for other types', () => {
      expect(getLanguageToken(123)).toBe(null);
      expect(getLanguageToken(true)).toBe(null);
      expect(getLanguageToken(false)).toBe(null);
      expect(getLanguageToken([])).toBe(null);
    });

    it('handles empty string', () => {
      expect(getLanguageToken('')).toBe(null);
    });
  });
});
