export const DatetimeWidget: any;
export const RecurrenceWidget: any;
export namespace widgetMapping {
    export namespace id {
        export { SchemaWidget as schema };
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
    }
    export let vocabulary: {
        'plone.app.vocabularies.Catalog': import("react").ForwardRefExoticComponent<Omit<import("react-intl").WithIntlProps<import("react-intl").WrappedComponentProps<string>>, "ref"> & import("react").RefAttributes<import("react").ComponentType<import("react-intl").WrappedComponentProps<string>>>> & {
            WrappedComponent: import("react").ComponentType<import("react-intl").WrappedComponentProps<string>>;
        };
    };
    export let factory: {
        'Relation List': import("react").ForwardRefExoticComponent<Omit<import("react-intl").WithIntlProps<import("react-intl").WrappedComponentProps<string>>, "ref"> & import("react").RefAttributes<import("react").ComponentType<import("react-intl").WrappedComponentProps<string>>>> & {
            WrappedComponent: import("react").ComponentType<import("react-intl").WrappedComponentProps<string>>;
        };
        'Relation Choice': any;
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
export const defaultWidget: import("react").FC<import("react-intl").WithIntlProps<any>> & {
    WrappedComponent: import("react").ComponentType<any>;
};
import SchemaWidget from '@plone/volto/components/manage/Widgets/SchemaWidget';
import TokenWidget from '@plone/volto/components/manage/Widgets/TokenWidget';
import QuerystringWidget from '@plone/volto/components/manage/Widgets/QuerystringWidget';
import UrlWidget from '@plone/volto/components/manage/Widgets/UrlWidget';
import IdWidget from '@plone/volto/components/manage/Widgets/IdWidget';
import RegistryImageWidget from '@plone/volto/components/manage/Widgets/RegistryImageWidget';
import TextareaWidget from '@plone/volto/components/manage/Widgets/TextareaWidget';
import PasswordWidget from '@plone/volto/components/manage/Widgets/PasswordWidget';
import FileWidget from '@plone/volto/components/manage/Widgets/FileWidget';
import AlignWidget from '@plone/volto/components/manage/Widgets/AlignWidget';
import ButtonsWidget from '@plone/volto/components/manage/Widgets/ButtonsWidget';
import InternalUrlWidget from '@plone/volto/components/manage/Widgets/InternalUrlWidget';
import EmailWidget from '@plone/volto/components/manage/Widgets/EmailWidget';
import ArrayWidget from '@plone/volto/components/manage/Widgets/ArrayWidget';
import QueryWidget from '@plone/volto/components/manage/Widgets/QueryWidget';
import QuerySortOnWidget from '@plone/volto/components/manage/Widgets/QuerySortOnWidget';
import ObjectBrowserWidget from '@plone/volto/components/manage/Widgets/ObjectBrowserWidget';
import ObjectWidget from '@plone/volto/components/manage/Widgets/ObjectWidget';
import ObjectListWidget from '@plone/volto/components/manage/Widgets/ObjectListWidget';
import VocabularyTermsWidget from '@plone/volto/components/manage/Widgets/VocabularyTermsWidget';
import ImageSizeWidget from '@plone/volto/components/manage/Widgets/ImageSizeWidget';
import SelectMetadataWidget from '@plone/volto/components/manage/Blocks/Search/widgets/SelectMetadataField';
import SelectAutoComplete from '@plone/volto/components/manage/Widgets/SelectAutoComplete';
import ColorPickerWidget from '@plone/volto/components/manage/Widgets/ColorPickerWidget';
import SelectWidget from '@plone/volto/components/manage/Widgets/SelectWidget';
import CheckboxWidget from '@plone/volto/components/manage/Widgets/CheckboxWidget';
import NumberWidget from '@plone/volto/components/manage/Widgets/NumberWidget';
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
