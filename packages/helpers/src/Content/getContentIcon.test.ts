import { describe, it, expect } from 'vitest';
import { getContentIconElement } from './getContentIcon';

describe('getContentIconElement', () => {
  it('returns FolderIcon for Folder content type', () => {
    const result = getContentIconElement('Folder');
    expect(result.type.name).toBe('FolderIcon');
  });

  it('returns PageIcon for Document content type', () => {
    const result = getContentIconElement('Document');
    expect(result.type.name).toBe('PageIcon');
  });

  it('returns NewsIcon for News Item content type', () => {
    const result = getContentIconElement('News Item');
    expect(result.type.name).toBe('NewsIcon');
  });

  it('returns CalendarIcon for Event content type', () => {
    const result = getContentIconElement('Event');
    expect(result.type.name).toBe('CalendarIcon');
  });

  it('returns ImageIcon for Image content type', () => {
    const result = getContentIconElement('Image');
    expect(result.type.name).toBe('ImageIcon');
  });

  it('returns AttachmentIcon for File content type', () => {
    const result = getContentIconElement('File');
    expect(result.type.name).toBe('AttachmentIcon');
  });

  it('returns LinkIcon for Link content type', () => {
    const result = getContentIconElement('Link');
    expect(result.type.name).toBe('LinkIcon');
  });

  it('returns PageIcon as fallback for unknown content type', () => {
    const result = getContentIconElement('UnknownType');
    expect(result.type.name).toBe('PageIcon');
  });

  it('returns PageIcon as fallback for empty string', () => {
    const result = getContentIconElement('');
    expect(result.type.name).toBe('PageIcon');
  });

  it('returns PageIcon as fallback for undefined', () => {
    const result = getContentIconElement(undefined as any);
    expect(result.type.name).toBe('PageIcon');
  });
});
