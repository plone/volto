```
// Overrideable core actions.
// See https://github.com/ianstormtaylor/slate/blob/master/packages/slate/src/interfaces/editor.ts

apply: (operation: Operation) => void

// Add a custom property to the leaf text nodes in the current selection.
// If the selection is currently collapsed, the marks will be added to the
// `editor.marks` property instead, and applied when text is inserted next.
addMark: (key: string, value: any) => void

removeMark: (key: string) => void

// Delete content in the editor backward from the current selection.
deleteBackward: (unit: 'character' | 'word' | 'line' | 'block') => void
deleteForward: (unit: 'character' | 'word' | 'line' | 'block') => void

// Insert a fragment at the current selection.
insertFragment: (fragment: Node[]) => void

// Delete the content in the current selection.
deleteFragment: () => void

getFragment: () => Descendant[]

// Insert a block break at the current selection.
// If the selection is currently expanded, it will be deleted first.
insertBreak: () => void

// Insert a node at the current selection.
// If the selection is currently expanded, it will be deleted first.
insertNode: (node: Node) => void

// Insert text at the current selection.
// If the selection is currently expanded, it will be deleted first.
insertText: (text: string) => void

transform:
  op types:
    insert_node
    insert_text
    merge_node
    move_node
    remove_node
    remove_text
    set_node
    set_selection
    split_node
```
