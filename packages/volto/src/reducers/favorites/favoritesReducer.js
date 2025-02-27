import config from '@plone/volto/registry';
import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  LOAD_FAVORITES,
} from '../../actions/favorites/favorites';

const STORAGE_KEY = 'volto_favorite_blocks';

const extractPreviewData = (blockData) => {
  if (!blockData) return null;

  const blockType = blockData['@type'];
  const blockConfig = config.blocks?.blocksConfig?.[blockType];

  // Allow custom preview extraction through config
  if (blockConfig?.extractPreview) {
    return blockConfig.extractPreview(blockData);
  }

  switch (blockType) {
    case 'image':
      return {
        type: 'single',
        images: [
          {
            url: blockData.url,
            alt: blockData.alt || 'Image preview',
          },
        ],
      };
    case 'imagegallery':
      return {
        type: 'gallery',
        images: (blockData.images || []).map((img) => ({
          url: img.url || img['@id'],
          alt: img.alt || 'Gallery image',
        })),
      };
    case 'video':
      return {
        type: 'video',
        url: blockData.url,
      };
    case 'slate':
      return {
        type: 'text',
        content: blockData.value?.[0]?.children?.[0]?.text || '',
      };
    default:
      return {
        type: 'default',
        content: blockType,
      };
  }
};

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
};

const saveToStorage = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {}
};

const initialState = {
  items: loadFromStorage(),
};

export default function favoritesReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case LOAD_FAVORITES:
      newState = {
        ...state,
        items: loadFromStorage(),
      };
      break;

    case ADD_TO_FAVORITES: {
      const blockExists = state.items.some(function (item) {
        return item.id === action.block.id;
      });
      if (blockExists) return state;
      const preview = extractPreviewData(action.block.data);
      const newItems = [
        ...state.items,
        {
          id: action.block.id,
          type: action.block.type,
          data: action.block.data,
          preview,
        },
      ];
      newState = {
        ...state,
        items: newItems,
      };
      saveToStorage(newItems);
      break;
    }

    case REMOVE_FROM_FAVORITES: {
      const newItems = state.items.filter((item) => item.id !== action.blockId);
      newState = {
        ...state,
        items: newItems,
      };
      saveToStorage(newItems);
      break;
    }

    default:
      return state;
  }
  return newState;
}
