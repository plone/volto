export default Body;
declare function Body({ data, isEditMode }: {
    data: any;
    isEditMode: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Body {
    namespace propTypes {
        let data: any;
    }
}
export function getVideoIDAndPlaceholder(url: any): {
    videoID: any;
    listID: any;
    thumbnailURL: string;
};
