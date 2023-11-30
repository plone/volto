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
        export { WysiwygWidget as richtext };
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
        'plone.app.vocabularies.Catalog': any;
    };
    export let factory: {
        'Relation List': any;
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
export const defaultWidget: any;
