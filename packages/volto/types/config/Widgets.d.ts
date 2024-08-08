export namespace widgetMapping {
    export namespace id {
        export { TokenWidget as subjects };
        export { QuerystringWidget as query };
        export { RecurrenceWidget as recurrence };
        export { UrlWidget as remoteUrl };
        export { IdWidget as id };
        export { RegistryImageWidget as site_logo };
    }
    export namespace widget {
        export { TextareaWidget as textarea };
        export { DatetimeWidget as datetime };
        export { DatetimeWidget as date };
        export { PasswordWidget as password };
        export { FileWidget as file };
        export { ImageWidget as image };
        export { AlignWidget as align };
        export { ButtonsWidget as buttons };
        export { UrlWidget as url };
        export { InternalUrlWidget as internal_url };
        export { EmailWidget as email };
        export { ArrayWidget as array };
        export { TokenWidget as token };
        export { QueryWidget as query };
        export { QuerySortOnWidget as query_sort_on };
        export { QuerystringWidget as querystring };
        export { ObjectBrowserWidget as object_browser };
        export { ObjectWidget as object };
        export { ObjectListWidget as object_list };
        export { VocabularyTermsWidget as vocabularyterms };
        export { ImageSizeWidget as image_size };
        export { SelectMetadataWidget as select_querystring_field };
        export { SelectAutoComplete as autocomplete };
        export { ColorPickerWidget as color_picker };
        export { SelectWidget as select };
        export { SchemaWidget as schema };
    }
    export let vocabulary: {
        'plone.app.vocabularies.Catalog': import("@loadable/component").LoadableComponent<Omit<import("react-intl").WithIntlProps<import("react-intl").WrappedComponentProps<string>>, "ref"> & import("react").RefAttributes<import("react").ComponentType<import("react-intl").WrappedComponentProps<string>>>>;
    };
    export let factory: {
        'Relation List': import("@loadable/component").LoadableComponent<Omit<import("react-intl").WithIntlProps<import("react-intl").WrappedComponentProps<string>>, "ref"> & import("react").RefAttributes<import("react").ComponentType<import("react-intl").WrappedComponentProps<string>>>>;
        'Relation Choice': import("@loadable/component").LoadableClassComponent<any>;
    };
    export { SelectWidget as choices };
    export namespace type {
        export { CheckboxWidget as boolean };
        export { ArrayWidget as array };
        export { FileWidget as object };
        export { DatetimeWidget as datetime };
        export { DatetimeWidget as date };
        export { PasswordWidget as password };
        export { NumberWidget as number };
        export { NumberWidget as integer };
        export { IdWidget as id };
    }
    export namespace views {
        export { getWidgetView as getWidget };
        export { TextViewWidget as default };
        export namespace id_1 {
            export { FileViewWidget as file };
            export { ImageViewWidget as image };
            export { RelationsViewWidget as relatedItems };
            export { TokenViewWidget as subjects };
        }
        export { id_1 as id };
        export namespace widget_1 {
            export { ArrayViewWidget as array };
            export { BooleanViewWidget as boolean };
            export { SelectViewWidget as choices };
            export { DateViewWidget as date };
            export { DatetimeViewWidget as datetime };
            export { DescriptionViewWidget as description };
            export { EmailViewWidget as email };
            export { FileViewWidget as file };
            export { ImageViewWidget as image };
            export { PasswordViewWidget as password };
            export { RelationViewWidget as relation };
            export { RelationsViewWidget as relations };
            export { RichTextViewWidget as richtext };
            export { TextViewWidget as string };
            export { TokenViewWidget as tags };
            export { TextViewWidget as textarea };
            export { TitleViewWidget as title };
            export { UrlViewWidget as url };
            export { InternalUrlWidget as internal_url };
            export function object(): string;
        }
        export { widget_1 as widget };
        let vocabulary_1: {};
        export { vocabulary_1 as vocabulary };
        export { SelectViewWidget as choices };
        export namespace type_1 {
            export { ArrayViewWidget as array };
            export { BooleanViewWidget as boolean };
        }
        export { type_1 as type };
    }
}
export const defaultWidget: import("@loadable/component").LoadableComponent<any>;
import { TokenWidget } from '@plone/volto/components/manage/Widgets';
import { QuerystringWidget } from '@plone/volto/components/manage/Widgets';
import { RecurrenceWidget } from '@plone/volto/components/manage/Widgets';
import { UrlWidget } from '@plone/volto/components/manage/Widgets';
import { IdWidget } from '@plone/volto/components/manage/Widgets';
import { RegistryImageWidget } from '@plone/volto/components/manage/Widgets';
import { TextareaWidget } from '@plone/volto/components/manage/Widgets';
import { DatetimeWidget } from '@plone/volto/components/manage/Widgets';
import { PasswordWidget } from '@plone/volto/components/manage/Widgets';
import { FileWidget } from '@plone/volto/components/manage/Widgets';
import ImageWidget from '@plone/volto/components/manage/Widgets/ImageWidget';
import { AlignWidget } from '@plone/volto/components/manage/Widgets';
import { ButtonsWidget } from '@plone/volto/components/manage/Widgets';
import { InternalUrlWidget } from '@plone/volto/components/manage/Widgets';
import { EmailWidget } from '@plone/volto/components/manage/Widgets';
import { ArrayWidget } from '@plone/volto/components/manage/Widgets';
import { QueryWidget } from '@plone/volto/components/manage/Widgets';
import { QuerySortOnWidget } from '@plone/volto/components/manage/Widgets';
import { ObjectBrowserWidget } from '@plone/volto/components/manage/Widgets';
import { ObjectWidget } from '@plone/volto/components/manage/Widgets';
import { ObjectListWidget } from '@plone/volto/components/manage/Widgets';
import { VocabularyTermsWidget } from '@plone/volto/components/manage/Widgets';
import { ImageSizeWidget } from '@plone/volto/components/manage/Widgets';
import { SelectMetadataWidget } from '@plone/volto/components/manage/Widgets';
import { SelectAutoComplete } from '@plone/volto/components/manage/Widgets';
import { ColorPickerWidget } from '@plone/volto/components/manage/Widgets';
import { SelectWidget } from '@plone/volto/components/manage/Widgets';
import { SchemaWidget } from '@plone/volto/components/manage/Widgets';
import { CheckboxWidget } from '@plone/volto/components/manage/Widgets';
import { NumberWidget } from '@plone/volto/components/manage/Widgets';
import { getWidgetView } from '@plone/volto/helpers/Widget/widget';
import TextViewWidget from '@plone/volto/components/theme/Widgets/TextWidget';
import FileViewWidget from '@plone/volto/components/theme/Widgets/FileWidget';
import ImageViewWidget from '@plone/volto/components/theme/Widgets/ImageWidget';
import RelationsViewWidget from '@plone/volto/components/theme/Widgets/RelationsWidget';
import TokenViewWidget from '@plone/volto/components/theme/Widgets/TokenWidget';
import ArrayViewWidget from '@plone/volto/components/theme/Widgets/ArrayWidget';
import BooleanViewWidget from '@plone/volto/components/theme/Widgets/BooleanWidget';
import SelectViewWidget from '@plone/volto/components/theme/Widgets/SelectWidget';
import DateViewWidget from '@plone/volto/components/theme/Widgets/DateWidget';
import DatetimeViewWidget from '@plone/volto/components/theme/Widgets/DatetimeWidget';
import DescriptionViewWidget from '@plone/volto/components/theme/Widgets/DescriptionWidget';
import EmailViewWidget from '@plone/volto/components/theme/Widgets/EmailWidget';
import PasswordViewWidget from '@plone/volto/components/theme/Widgets/PasswordWidget';
import RelationViewWidget from '@plone/volto/components/theme/Widgets/RelationWidget';
import RichTextViewWidget from '@plone/volto/components/theme/Widgets/RichTextWidget';
import TitleViewWidget from '@plone/volto/components/theme/Widgets/TitleWidget';
import UrlViewWidget from '@plone/volto/components/theme/Widgets/UrlWidget';
