// The Widgets are forced to be imported not from the index but from its own
// full path due to circular import issues
import ArrayWidget from '../components/manage/Widgets/ArrayWidget';
import CheckboxWidget from '../components/manage/Widgets/CheckboxWidget';
import DatetimeWidget from '../components/manage/Widgets/DatetimeWidget';
import FileWidget from '../components/manage/Widgets/FileWidget';
import PasswordWidget from '../components/manage/Widgets/PasswordWidget';
import SchemaWidget from '../components/manage/Widgets/SchemaWidget';
import SelectWidget from '../components/manage/Widgets/SelectWidget';
import TextareaWidget from '../components/manage/Widgets/TextareaWidget';
import TextWidget from '../components/manage/Widgets/TextWidget';
import WysiwygWidget from '../components/manage/Widgets/WysiwygWidget';

// Widgets mapping
export const widgetMapping = {
  id: {
    schema: SchemaWidget,
  },
  widget: {
    richtext: WysiwygWidget,
    textarea: TextareaWidget,
    datetime: DatetimeWidget,
    password: PasswordWidget,
  },
  vocabulary: {
    'plone.app.vocabularies.Keywords': ArrayWidget,
  },
  choices: SelectWidget,
  type: {
    boolean: CheckboxWidget,
    array: ArrayWidget,
    object: FileWidget,
    datetime: DatetimeWidget,
  },
};

// Default Widget
export const defaultWidget = TextWidget;
