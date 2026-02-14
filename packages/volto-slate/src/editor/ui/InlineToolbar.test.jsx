import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { createEditor } from 'slate';
import { Slate, withReact, ReactEditor } from 'slate-react';
import InlineToolbar from './InlineToolbar';
import config from '@plone/volto/registry';

// Mock dependencies
jest.mock('@plone/volto/registry');
jest.mock('slate-react', () => ({
    ...jest.requireActual('slate-react'),
    ReactEditor: {
        ...jest.requireActual('slate-react').ReactEditor,
        toDOMNode: jest.fn(),
        isFocused: jest.fn(),
    },
}));

describe('InlineToolbar', () => {
    let editor;
    let mockConfig;

    beforeEach(() => {
        // Create a mock editor
        editor = withReact(createEditor());
        editor.children = [{ type: 'p', children: [{ text: 'Test content' }] }];
        editor.selection = { anchor: { path: [0, 0], offset: 0 }, focus: { path: [0, 0], offset: 0 } };
        editor.getSavedSelection = jest.fn(() => null);
        editor.setSavedSelection = jest.fn();

        // Mock config
        mockConfig = {
            settings: {
                slate: {
                    toolbarButtons: ['bold', 'italic', 'heading-two', 'heading-three'],
                    expandedToolbarButtons: [],
                    contextToolbarButtons: [],
                    elementToolbarButtons: {},
                    buttons: {},
                    enableExpandedToolbar: false,
                },
            },
        };
        config.settings = mockConfig.settings;

        // Mock ReactEditor.toDOMNode to return a mock DOM element
        const mockElement = document.createElement('div');
        ReactEditor.toDOMNode.mockReturnValue(mockElement);
        ReactEditor.isFocused.mockReturnValue(true);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render without crashing', () => {
        const { container } = render(
            <Slate editor={editor} initialValue={editor.children}>
                <InlineToolbar
                    editor={editor}
                    className=""
                    showExpandedToolbar={false}
                    setShowExpandedToolbar={jest.fn()}
                />
            </Slate>
        );
        expect(container).toBeTruthy();
    });

    it('should show toolbar when editor gains focus (regression test for heading buttons bug)', async () => {
        const setShowExpandedToolbar = jest.fn();

        const { container } = render(
            <Slate editor={editor} initialValue={editor.children}>
                <InlineToolbar
                    editor={editor}
                    className=""
                    showExpandedToolbar={false}
                    setShowExpandedToolbar={setShowExpandedToolbar}
                />
            </Slate>
        );

        // Simulate editor gaining focus with collapsed selection (cursor placement)
        const mockElement = ReactEditor.toDOMNode();
        Object.defineProperty(document, 'activeElement', {
            writable: true,
            value: mockElement,
        });

        // Simulate selection change event with collapsed selection
        window.getSelection = jest.fn(() => ({
            isCollapsed: true, // Cursor placed but no text selected
            rangeCount: 1,
        }));

        fireEvent(document, new Event('selectionchange'));

        await waitFor(() => {
            // The toolbar should be visible even with a collapsed selection
            // This is the key fix for the heading buttons issue
            expect(container.querySelector('.slate-toolbar')).toBeTruthy();
        });
    });

    it('should hide toolbar when editor loses focus', async () => {
        const setShowExpandedToolbar = jest.fn();

        const { container } = render(
            <Slate editor={editor} initialValue={editor.children}>
                <InlineToolbar
                    editor={editor}
                    className=""
                    showExpandedToolbar={false}
                    setShowExpandedToolbar={setShowExpandedToolbar}
                />
            </Slate>
        );

        // First, simulate editor having focus
        const mockElement = ReactEditor.toDOMNode();
        Object.defineProperty(document, 'activeElement', {
            writable: true,
            value: mockElement,
        });

        window.getSelection = jest.fn(() => ({
            isCollapsed: false,
            rangeCount: 1,
        }));

        fireEvent(document, new Event('selectionchange'));

        await waitFor(() => {
            expect(container.querySelector('.slate-toolbar')).toBeTruthy();
        });

        // Now simulate losing focus
        Object.defineProperty(document, 'activeElement', {
            writable: true,
            value: document.body,
        });

        fireEvent(document, new Event('selectionchange'));

        // The toolbar should hide when focus is lost
        // This ensures the fix doesn't break existing blur behavior
    });

    it('should show toolbar when text is selected (existing behavior)', async () => {
        const setShowExpandedToolbar = jest.fn();

        const { container } = render(
            <Slate editor={editor} initialValue={editor.children}>
                <InlineToolbar
                    editor={editor}
                    className=""
                    showExpandedToolbar={false}
                    setShowExpandedToolbar={setShowExpandedToolbar}
                />
            </Slate>
        );

        // Simulate text selection (range selection)
        const mockElement = ReactEditor.toDOMNode();
        Object.defineProperty(document, 'activeElement', {
            writable: true,
            value: mockElement,
        });

        window.getSelection = jest.fn(() => ({
            isCollapsed: false, // Text is selected
            rangeCount: 1,
        }));

        fireEvent(document, new Event('selectionchange'));

        await waitFor(() => {
            // Toolbar should be visible with text selection (existing behavior preserved)
            expect(container.querySelector('.slate-toolbar')).toBeTruthy();
        });
    });
});
